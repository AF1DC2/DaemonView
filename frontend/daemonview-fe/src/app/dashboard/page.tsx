'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
//import { useEffect } from 'react';
import styled from 'styled-components';
import {
  FiSearch,
  FiInfo,
  FiFilter,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiHome,
  FiBarChart2,
  FiAlertCircle,
  FiClock,
  FiServer,
  FiSettings,
  FiHelpCircle,
} from 'react-icons/fi';
import '../globals.css';

// sidebar items array
const sidebarIcons = [
  { icon: <FiHome />, label: 'Home' },
  { icon: <FiBarChart2 />, label: 'Stats' },
  { icon: <FiAlertCircle />, label: 'Alerts' },
  { icon: <FiClock />, label: 'History' },
  { icon: <FiServer />, label: 'Servers' },
  { icon: <FiSettings />, label: 'Settings' },
  { icon: <FiHelpCircle />, label: 'Help' },
];

const DaemonView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // sidebar open/close status
  //const [username, setUsername] = useState('');
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const handleProfileClick = () => {
    router.push('/dashboard/profile');
  };
  {/*useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/check-auth', {
          method: 'GET',
          credentials: 'include'
        });

        if (res.ok) {
          const data = await res.json();
          setUsername(data.user.username);
        }
        else {
          router.push('/login')
        }
      }
      catch (err) {
        console.error('Auth check failed', err);
        router.push('/login')
      }
    };
    fetchUser();
  })*/}

  return (
    <Container>
      {/* sidebar is conditionally rendered based on sidebarOpen state */}
      {sidebarOpen && (
        <Sidebar>
          {/* iterating over sidebarIcons array to render each button in the sidebar */}
          {sidebarIcons.map(({ icon, label }, idx) => (
            <SidebarButton key={idx} title={label}>
              {icon} {/* each button gets the respective icon */}
            </SidebarButton>
          ))}
        </Sidebar>
      )}

      {/* main content area */}
      <Content>
        <Header>
          <LeftHeader>
            {/* button to toggle sidebar open/close */}
            <SidebarToggle onClick={() => setSidebarOpen(!sidebarOpen)}>
              {/* conditionally render the close or menu icon based on sidebarOpen state */}
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </SidebarToggle>
            {/* search bar */}
            <SearchBar placeholder="Search for ..." />
          </LeftHeader>

          {/* title image */}
          <TitleImage src="/images/daemonview.png" alt="DaemonView" />

          {/* user area showing user profile icon and username */}
          <UserArea>
            <FiUser size={20} style={{ cursor: 'pointer' }} onClick={handleProfileClick} />
            {/* <span>{username}</span> */}
            <FiLogOut size={20} style={{ cursor: 'pointer' }} onClick={handleLogout} />
          </UserArea>
        </Header>

        {/* main action buttons */}
        <MainButtons>
          {/* iterating through 7 buttons */}
          {Array.from({ length: 7 }, (_, idx) => (
            <MainButton key={`main-btn-${idx}`}>
              Button {idx + 1}
            </MainButton>
          ))}
        </MainButtons>

        {/* table section */}
        <TableSection>
          <TableHeader>
            <TableSearch>
              <input type="text" placeholder="Search for ..." />
              <FiSearch />
            </TableSearch>
            {/* filter button for table */}
            <TableActions>
              <FiFilter />
            </TableActions>
          </TableHeader>

          {/* table for data */}
          <Table>
            <thead>
              <tr>
                {/* creating table headers dynamically */}
                {Array.from({ length: 10 }, (_, idx) => (
                  <th key={`col-${idx}`}>Col{idx + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* creating table rows dynamically */}
              {Array.from({ length: 10 }, (_, idx) => (
                <tr key={`row-${idx}`}>
                  <td>
                    <FiInfo />
                  </td>
                  {/* filling in dummy data for the table cells */}
                  {Array.from({ length: 9 }, (_, i) => (
                    <td key={`cell-${idx}-${i}`}>Dummy</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </TableSection>
      </Content>
    </Container>
  );
};

export default DaemonView;

// styled components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #090821;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  transition: background-color 0.3s ease;
`;

const Sidebar = styled.div`
  width: 70px;
  background-color: #2a274f;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 15px;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const SidebarButton = styled.button`
  background: #1e1b3a;
  border: none;
  color: #fff;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #635bff;
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`;

const SidebarToggle = styled.button`
  background: #1a1839;
  border: none;
  padding: 8px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: #635bff;
  }
`;

const SearchBar = styled.input`
  padding: 10px 20px;
  background-color: #1a1839;
  border: none;
  border-radius: 30px;
  color: #fff;
  width: 240px;
  font-size: 14px;
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1a1839;
  padding: 8px 12px;
  border-radius: 20px;
`;

const MainButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const MainButton = styled.button<{ selected?: boolean }>`
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease;
  box-shadow: ${({ selected }) => (selected ? '0 0 10px #635bffaa' : 'none')};
  background-color: ${({ selected }) => (selected ? '#635bff' : '#2a274f')};
  color: #fff;

  &:hover {
    background-color: #4e49c4;
    transform: translateY(-2px);
  }
`;

const TableSection = styled.div`
  flex: 1;
  background-color: rgba(19, 18, 48, 0.85);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TableSearch = styled.div`
  background-color: #1a1839;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;

  input {
    background: none;
    border: none;
    color: #fff;
    outline: none;
    font-size: 14px;
    width: 160px;
  }
`;

const TableActions = styled.div`
  background: #1a1839;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #635bff;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #2a274f;
  }

  tbody tr:hover {
    background-color: #1d1b3c;
  }

  td {
    font-family: 'BPReplay', sans-serif;
  }
`;

const TitleImage = styled.img`
  height: 60px;
  object-fit: contain;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.2));
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
