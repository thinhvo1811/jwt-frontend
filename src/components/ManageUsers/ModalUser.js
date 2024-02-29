import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchGroups } from '../../services/userService';

const ModalUser = (props) => {
    const [userGroups, setUserGroups] = useState([]);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [sex, setSex] = useState('');
    const [group, setGroup] = useState('');

    useEffect(() => {
        getGroup();
    }, []);

    const getGroup = async () => {
        let response = await fetchGroups();
        if (response && response.data && response.data.EC === 0) {
            setUserGroups(response.data.DT);
        } else {
            toast.error(response.data.EM);
        }
    };

    return (
        <Modal size="lg" show={true} className="modal-user">
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
                        <input className="form-control" type="email" />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>
                            Phone number (<span className="red">*</span>) :
                        </label>
                        <input className="form-control" type="text" />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>Username:</label>
                        <input className="form-control" type="text" />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>
                            Password (<span className="red">*</span>) :
                        </label>
                        <input className="form-control" type="password" />
                    </div>
                    <div className="col-12 col-md-12 form-group">
                        <label>Address:</label>
                        <input className="form-control" type="text" />
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>Gender:</label>
                        <select className="form-select">
                            <option value={'Male'}>Male</option>
                            <option value={'Female'}>Female</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 form-group">
                        <label>
                            Group (<span className="red">*</span>) :
                        </label>
                        <select className="form-select">
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
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.confirmDeleteUser}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUser;
