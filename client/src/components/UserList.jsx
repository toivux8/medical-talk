import React, {useState, useEffect} from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

import { InviteIcon } from '../assets'

const ListContainer = ({ children }) => {
    <div className="user-item__container">
        <div className="user-item__name-header">
            <p>User</p>
            <p>Invite</p>
        </div>
        { children }
    </div>
}

const UserItem = () => {
    <div className="user-item__wrapper">
        <div className="user-item__name-wrapper">
            <Avatar />
        </div>
    </div>
}

const UserList = () => {
    const [selected, setSelected] = useState(false);

    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return ;
            setLoading(true);

            try {
                const respond = await client.queryUsers(
                    { id: { $ne: client.userID }},
                    { id :1 },
                    { limit: 8 }
                )

                if(users.length) {
                    setUsers(respond.users)
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        if(client) getUsers()
    }, [])

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users ...
            </div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user}  />
                ))
            )}
        </ListContainer>
    )
}

export default UserList