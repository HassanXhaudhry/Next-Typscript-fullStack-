import React, { useEffect } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { logout } from '@/lib/redux/authSlice';
import { User } from "lucide-react";

const DropdownMenu: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      onClick: handleProfileClick,
    },
    {
      key: "3",
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <span style={{ cursor: "pointer" }}>
        <Space>
          <User className="h-6 w-6 text-white" />
        </Space>
      </span>
    </Dropdown>
  );
};

export default DropdownMenu;
