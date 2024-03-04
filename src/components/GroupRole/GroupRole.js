import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import './GroupRole.scss';
import { fetchGroups } from '../../services/userService';
import { fetchAllRoles, fetchRoleByGroup, assignRolesToGroup } from '../../services/roleService';

const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [groupSelectInput, setGroupSelectInput] = useState('');
    const [listRoles, setListRoles] = useState([]);
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

    useEffect(() => {
        getGroup();
        getAllRoles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getGroup = async () => {
        let response = await fetchGroups();
        if (response && +response.EC === 0) {
            setUserGroups(response.DT);
        } else {
            toast.error(response.EM);
        }
    };

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    };

    const handleOnChangeGroup = async (value) => {
        setGroupSelectInput(value);
        if (value) {
            let data = await fetchRoleByGroup(value);

            if (data && +data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
                setAssignRolesByGroup(result);
            }
        }
    };

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            // eslint-disable-next-line array-callback-return
            allRoles.map((role) => {
                let object = {};
                object.id = role.id;
                object.url = role.url;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some((item) => item.url === object.url);
                }

                result.push(object);
            });
        }

        return result;
    };

    const handleCheckRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex((item) => +item.id === +value);
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup);
    };

    const buildDataToSave = () => {
        let result = {};
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        result.groupId = groupSelectInput;
        let groupRolesFilter = _assignRolesByGroup.filter((item) => item.isAssigned === true);
        let finalGroupRoles = groupRolesFilter.map((item) => {
            return { groupId: +groupSelectInput, roleId: +item.id };
        });
        result.groupRoles = finalGroupRoles;
        return result;
    };

    const handleSave = async () => {
        let data = buildDataToSave();
        let response = await assignRolesToGroup(data);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
    };

    return (
        <div className="group-role-container">
            <div className="container">
                <div className="title mt-3">
                    <h4>Group Role:</h4>
                </div>
                <div className="assign-group-role">
                    <div className="col-12 col-md-6 form-group">
                        <label>
                            Select Group: (<span className="red">*</span>) :
                        </label>
                        <select className="form-select" onChange={(e) => handleOnChangeGroup(e.target.value)}>
                            <option value="">Please select group</option>
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
                    {groupSelectInput && (
                        <>
                            <hr />
                            <div className="roles">
                                <h5>Assign Roles:</h5>
                                {assignRolesByGroup &&
                                    assignRolesByGroup.length > 0 &&
                                    assignRolesByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`role-${index}`}
                                                    value={item.id}
                                                    checked={item.isAssigned}
                                                    onChange={(e) => handleCheckRole(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`role-${index}`}>
                                                    {item.url}
                                                </label>
                                            </div>
                                        );
                                    })}
                                <div className="mt-3">
                                    <button className="btn btn-warning" onClick={() => handleSave()}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupRole;
