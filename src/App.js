import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
// import { error } from 'console';

//  Тут список пользователей: https://reqres.in/api/users

function App() {
 const [isLoading, setisLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [invites, setInvites] = useState([]);
  const [sucsses, setSucsses] = useState(false);
  const onSearchValue = (e) => {
     setSearchValue(e.target.value)
  };
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
    setInvites(prev => prev.filter(_id =>_id !== id))
    } else {
      setInvites(prev=>[...prev,id])
    }
  }
  const onClickinviteSends = () => {
    setSucsses(true)
  }
  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((resp) => resp.json())
      .then((json) => {
        setUsers(json.data);
      }).catch((err) => {
        console.warn(err);
        alert('Це пиздець !')
      }).finally(()=> setisLoading(false));
    
  }, []);
 
  return (
    <div className="App">
      {sucsses ? (
        <Success count={invites.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          onSearchValue={onSearchValue}
          searchValue={searchValue}
          onClickInvite={onClickInvite}
          invites={invites}
          onClickinviteSends={onClickinviteSends}
        />
      )}
    </div>
  );
}

export default App;
