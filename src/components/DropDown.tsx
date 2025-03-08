import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import {Button, MenuProps} from 'antd';
import { Dropdown } from 'antd';
import { FaSackDollar } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";



const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Sort by Date
      </a>
    ),
    icon: <BsCalendar2DateFill />,
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Sort by Total price
      </a>
    ),
    icon: <FaSackDollar />,
  }
];

export const DropDown = () => (
  <Dropdown menu={{ items }} placement="top" arrow>
    <Button>Sort List</Button>
  </Dropdown>
);
