import { useRef, useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import './Role.scss';
import { createRoles } from '../../services/roleService';
import TableRole from './TableRole';

const Role = (props) => {
    const defaultDataChild = { url: '', description: '', isValidUrl: true };
    const [listChildren, setListChildren] = useState({ child1: defaultDataChild });
    const childRef = useRef();

    const handleOnChangeInput = (name, value, key) => {
        let _listChildren = _.cloneDeep(listChildren);
        _listChildren[key][name] = value;

        if (name === 'url' && value) {
            _listChildren[key]['isValidUrl'] = true;
        }
        setListChildren(_listChildren);
    };

    const handleAddNewInput = () => {
        let _listChildren = _.cloneDeep(listChildren);
        _listChildren[`child-${uuidv4()}`] = defaultDataChild;
        setListChildren(_listChildren);
    };

    const handleDeleteInput = (key) => {
        let _listChildren = _.cloneDeep(listChildren);
        delete _listChildren[key];
        setListChildren(_listChildren);
    };

    const buildDataToPersist = () => {
        let _listChildren = _.cloneDeep(listChildren);
        let result = [];
        // eslint-disable-next-line array-callback-return
        Object.entries(_listChildren).map(([key, value], index) => {
            result.push({
                url: value.url,
                description: value.description,
            });
        });
        return result;
    };

    const handleSave = async () => {
        let invalidObj = Object.entries(listChildren).find(([key, value], index) => {
            return value && !value.url;
        });

        if (!invalidObj) {
            let data = buildDataToPersist();
            let response = await createRoles(data);
            if (response && response.EC === 0) {
                toast.success(response.EM);
                setListChildren({ child1: defaultDataChild });
                childRef.current.fetchAllRolesAgain();
            }
            if (response && response.EC !== 0) {
                toast.error(response.EM);
            }
        } else {
            toast.error('URL input must not be empty');
            let _listChildren = _.cloneDeep(listChildren);
            const key = invalidObj[0];
            _listChildren[key]['isValidUrl'] = false;
            setListChildren(_listChildren);
        }
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className="adding-roles mt-3">
                    <div className="title-role">
                        <h4>Add a new role...</h4>
                    </div>
                    <div className="role-parent">
                        {Object.entries(listChildren).map(([key, value], index) => {
                            return (
                                <div className="role-child row" key={`child-${key}`}>
                                    <div className="col-5 form-group">
                                        <label>URL:</label>
                                        <input
                                            className={value.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                            value={value.url}
                                            onChange={(e) => handleOnChangeInput('url', e.target.value, key)}
                                        />
                                    </div>
                                    <div className="col-5 form-group">
                                        <label>Description:</label>
                                        <input
                                            className="form-control"
                                            value={value.description}
                                            onChange={(e) => handleOnChangeInput('description', e.target.value, key)}
                                        />
                                    </div>
                                    <div className="col-2 mt-4 actions">
                                        <i
                                            className="fa fa-plus-circle add-btn"
                                            onClick={() => handleAddNewInput()}
                                        ></i>
                                        {index >= 1 && (
                                            <i
                                                className="fa fa-trash-o delete-btn"
                                                onClick={() => handleDeleteInput(key)}
                                            ></i>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        <div>
                            <button className="btn btn-warning mt-3" onClick={() => handleSave()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="table-role mt-3">
                    <h4>List Current Roles:</h4>
                    <TableRole ref={childRef} />
                </div>
            </div>
        </div>
    );
};

export default Role;
