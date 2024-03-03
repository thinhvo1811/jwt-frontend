import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { fetchAllRoles, deleteRole } from '../../services/roleService';
import { toast } from 'react-toastify';

const TableRole = (props, ref) => {
    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getAllRoles();
    }, []);

    useImperativeHandle(ref, () => ({
        fetchAllRolesAgain() {
            getAllRoles();
        },
    }));

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && data.EC === 0) {
            setListRoles(data.DT);
        }
    };

    const handleDeleteRole = async (role) => {
        let data = await deleteRole(role);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await getAllRoles();
        }
    };
    return (
        <>
            {listRoles && listRoles.length > 0 ? (
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">URL</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRoles.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <span
                                            title="Delete"
                                            className="delete-btn"
                                            onClick={() => handleDeleteRole(item)}
                                        >
                                            <i className="fa fa-trash-o"></i>
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <span>Not Found Roles</span>
            )}
        </>
    );
};

export default forwardRef(TableRole);
