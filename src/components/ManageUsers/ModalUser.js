import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { fetchGroups, createNewUser } from '../../services/userService';

const ModalUser = (props) => {
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        groupId: '',
    };

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        groupId: true,
    };

    const [userGroups, setUserGroups] = useState([]);
    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    useEffect(() => {
        getGroup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getGroup = async () => {
        let response = await fetchGroups();
        if (response && response.data && response.data.EC === 0) {
            setUserGroups(response.data.DT);
            if (response.data.DT && response.data.DT.length > 0) {
                setUserData({ ...userData, groupId: response.data.DT[0].id });
            }
        } else {
            toast.error(response.data.EM);
        }
    };

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'groupId'];
        let check = true;

        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.error(`Please enter the ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check) {
            let response = await createNewUser(userData);
            if (response && response.data && response.data.EC === 0) {
                props.onHide();
                setUserData({ ...defaultUserData, groupId: userGroups[0].id });
            } else {
                toast.error(response.data.EM);
            }
        }
    };

    return (
        <Modal size="lg" show={props.show} onHide={props.onHide} className="modal-user">
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>{props.title}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="content-body row">
                    <div className="col-12 col-md-6 form-group">
                        <label>
                            Email address (<span className="red">*</span>) :
                        </label>
                        <input
                            className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                            type="email"
                            value={userData.email}
                            onChange={(e) => handleOnChangeInput(e.target.value, 'email')}
                        />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>
                            Phone number (<span className="red">*</span>) :
                        </label>
                        <input
                            className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            value={userData.phone}
                            onChange={(e) => handleOnChangeInput(e.target.value, 'phone')}
                        />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>Username:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={userData.username}
                            onChange={(e) => handleOnChangeInput(e.target.value, 'username')}
                        />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>
                            Password (<span className="red">*</span>) :
                        </label>
                        <input
                            className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                            type="password"
                            value={userData.password}
                            onChange={(e) => handleOnChangeInput(e.target.value, 'password')}
                        />
                    </div>
                    <div className="col-12 col-md-12 form-group">
                        <label>Address:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={userData.address}
                            onChange={(e) => handleOnChangeInput(e.target.value, 'address')}
                        />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>Gender:</label>
                        <select className="form-select" onChange={(e) => handleOnChangeInput(e.target.value, 'sex')}>
                            <option value={'Male'}>Male</option>
                            <option value={'Female'}>Female</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>
                            Group (<span className="red">*</span>) :
                        </label>
                        <select
                            className="form-select"
                            onChange={(e) => handleOnChangeInput(e.target.value, 'groupId')}
                        >
                            {userGroups.length > 0 &&
                                userGroups.map((item, index) => {
                                    return (
                                        <option key={`group-${index}`} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleConfirmUser()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUser;
