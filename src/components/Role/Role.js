import { useEffect, useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import './Role.scss';

const Role = (props) => {
    const [listChildren, setListChildren] = useState({
        child1: { url: '', description: '' },
    });

    const handleOnChangeInput = (name, value, key) => {
        let _listChildren = _.cloneDeep(listChildren);
        _listChildren[key][name] = value;
        setListChildren(_listChildren);
    };

    const handleAddNewInput = () => {
        let _listChildren = _.cloneDeep(listChildren);
        _listChildren[`child-${uuidv4()}`] = {
            url: '',
            description: '',
        };
        setListChildren(_listChildren);
    };

    const handleDeleteInput = (key) => {
        let _listChildren = _.cloneDeep(listChildren);
        delete _listChildren[key];
        setListChildren(_listChildren);
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className="mt-3">
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
                                            className="form-control"
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
                            <button className="btn btn-warning mt-3">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Role;
