import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import './Users.scss';
import { deleteUser, fetchAllUsers } from '../../services/userService';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModal, setDataModal] = useState({});

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);

        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT.users);
            setTotalPages(response.data.DT.totalPages);
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    };

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    };

    const onHideModalUser = () => {
        setIsShowModalUser(false);
    };

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);
        if (response && response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.data.EM);
        }
    };

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                        <div className="actions">
                            <button className="btn btn-success">Refresh</button>
                            <button className="btn btn-primary" onClick={() => setIsShowModalUser(true)}>
                                Add new user
                            </button>
                        </div>
                    </div>
                    <div className="user-body">
                        {listUsers && listUsers.length > 0 ? (
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Group</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button className="btn btn-warning mx-3">Edit</button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteUser(item)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <span>Not Found Users</span>
                        )}
                    </div>
                    {totalPages > 0 && (
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    )}
                </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />

            <ModalUser title={'Create new user'} show={isShowModalUser} onHide={onHideModalUser} />
        </>
    );
};

export default Users;
