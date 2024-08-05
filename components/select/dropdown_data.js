import styles from './select.module.scss';
import unorm from 'unorm';
import React, { useState, useEffect } from 'react';

const DropdownData = (props) => {
  const [newData, setNewData] = useState(props.data);
  let filteredData = props.data; // Lưu trữ dữ liệu đã được lọc
  let prevSearchValue = ''; // Khởi tạo giá trị tìm kiếm trước đó
  const handleChangeInput = (e) => {
    const searchValue = unorm.nfd(e.target.value).trim().toLowerCase();

    if (searchValue === '') {
      setNewData(props.data);
    } else {
      if (searchValue.startsWith(prevSearchValue)) {
        filteredData = filteredData?.filter((item) =>
          unorm.nfd(Object.values(item)[2]).toLowerCase().includes(searchValue)
        );
      } else {
        filteredData = props.data?.filter((item) =>
          unorm.nfd(Object.values(item)[2]).toLowerCase().includes(searchValue)
        );
      }
      setNewData(filteredData);
    }
    prevSearchValue = searchValue;
  };

  return (
    <div className={styles.select_select_input}>
      <div className={styles.input}>
        <input
          type="text"
          className="input-box"
          style={{ width: '100%', height: '30px' }}
          onChange={handleChangeInput}
        />
      </div>
      <div className={styles.select_option}>
        <span
          className={` ${styles.option}`}
          onClick={(e) => props.setSelectValue([])}
        >
          {props.placeholder}
        </span>
        {newData?.map((item, i) => (
          <span
            style={{ display: 'block', fontWeight: '500' }}
            key={i}
            className={` ${styles.option}`}
            onClick={(e) =>
              props.setSelectValue([
                Object.values(item)[1],
                Object.values(item)[2],
              ])
            }
          >
            {Object.values(item)[2]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DropdownData;
