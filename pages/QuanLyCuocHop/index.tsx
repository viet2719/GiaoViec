// import React, { useState } from "react";

import React, { useState, useEffect, useContext } from "react";
import { Input } from "antd";
import TodayMeeting from "@/pages/components/MeetingManagement/Detail/TodayMeeting";
import Meeting_ST from "@/pages/components/MeetingManagement/Detail/Meeting_ST";
import Meeting_DQ from "@/pages/components/MeetingManagement/Detail/Meeting_DQ";
import Image from "next/image";
import BtnThemMoi from "./BtnThemMoi";
import { POST, POST_PARAM_QUERY, POST_QLC_NoCom, getComId } from "../api/auth";
import { RoleMeetingContext } from '@/utils/constantContext'




const { Search } = Input;
export default function PostPage({
  setActiveKey,
  setOpenKeys,
  selectedColor,
  isHasRole,
}: {
  isHasRole: boolean;
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
}) {
  const [reload,setReload] = useState(true)
  const [activeTab, setActiveTab] = useState('all');
  const [allMeeting,setAllMeeting]:any = useState({})
  const [isComingMeeting, setIsComingMeeting]:any = useState({})
  const [createdByMe, setCreatedByMe]:any = useState({})
  const [cancelMeeting, setCancelMeeting]:any = useState({})
  const [listDep,setListDep]:any = useState([])
  const [listEmp,setListEmp]:any = useState([])
  const [listRoom,setListRoom]:any = useState([])
  const [count,setCount]:any = useState({})
  const {role,setRole} = useContext(RoleMeetingContext)

  useEffect(()=>{
    if(reload){
      POST('meetings/quan-ly-cuoc-hop',{})
      .then(res=>{
        if(res){
            setAllMeeting(res?.data?.TatCaCuocHop?.TatCaCuocHop)
            setIsComingMeeting(res?.data?.CuocHopSapDienRa?.CuocHopSapDienRa)
            setCreatedByMe(res?.data?.CuocHopTaoBoiToi?.CuocHopTaoBoiToi)
            setCancelMeeting(res?.data?.CuocHopBiHuy?.CuocHopBiHuy)
            setListRoom(res?.data?.listMeetingRoom)
            setCount({
              all:res?.data?.TatCaCuocHop?.countTatCaCuocHop,
              isComing:res?.data?.CuocHopSapDienRa?.countCuocHopSapDienRa,
              byMe:res?.data?.CuocHopTaoBoiToi?.countCuocHopTaoBoiToi,
              cancel:res?.data?.CuocHopBiHuy?.countCuocHopBiHuy
            })
            //setRole(res?.listRole?.cuochop)
        }
      })
      POST_QLC_NoCom('department/list',{})
      .then(res => {
        if(res){
          setListDep(res?.items)
        }
      })
      // POST_QLTS('DanhSach/dep',{})
      // .then(res => {
      //   if(res){
      //     setListDep(res?.data)
      //   }
      // })
      POST_QLC_NoCom('managerUser/listAll',{})
      .then(res => {
        if(res){
          setListEmp(res?.items)
        }
      })
      setReload(false)
    }
  },[reload])
  const onSearch = (value: string) => {
    POST_PARAM_QUERY('meetings/quan-ly-cuoc-hop',{},{keywords:value})
    .then(res => {
      if(res){
        setAllMeeting(res?.data?.TatCaCuocHop?.TatCaCuocHop)
        setIsComingMeeting(res?.data?.CuocHopSapDienRa?.CuocHopSapDienRa)
        setCreatedByMe(res?.data?.CuocHopTaoBoiToi?.CuocHopTaoBoiToi)
        setCancelMeeting(res?.data?.CuocHopBiHuy?.CuocHopBiHuy)
        setCount({
          all:res?.data?.TatCaCuocHop?.countTatCaCuocHop,
          isComing:res?.data?.CuocHopSapDienRa?.countCuocHopSapDienRa,
          byMe:res?.data?.CuocHopTaoBoiToi?.countCuocHopTaoBoiToi,
          cancel:res?.data?.CuocHopBiHuy?.countCuocHopBiHuy
        })
      }
    })
  };
  const onClick = (info: any) => {
    setActiveKey(info?.key);
    info?.key === "trang-chu" ? setOpenKeys([]) : null;
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div>
        <div className="margin_20px">
          <div className="box_work" id="meeting">
            <div id="list_work" style={{ height: "2000px" }}>
              <div className="text_work1">
                <h4 className={`name_list ${selectedColor}`}>
                  Danh sách cuộc họp
                </h4>
              </div>
              { (isHasRole || role?.includes('2')) ? (
                // ??????????cty???????????????????????????????????????????????
                <div>
                  <div onChange={e => e.preventDefault()}>
                    <div className="form_searchch">
                      <BtnThemMoi 
                        selectedColor={selectedColor} 
                        listDep = {listDep}
                        listEmp = {listEmp}
                        listRoom = {listRoom}
                        setReload = {setReload}
                      />
                      <div className="searchcv">
                        <Search placeholder="Tìm kiếm cuộc họp" onSearch={onSearch}/>
                      </div>
                    </div>
                  </div>
                  <div className="scrollmobile" id="navbar_meeting">
                    <div className="navbar" >
                      <div className={`all_metting ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => handleTabClick('all')} >
                        <label className="wind_alm windo_one">
                          <p className="numb_mett" style={{ margin: "0px" }}>{count.all}</p>
                          <p className="note_mett" style={{ margin: "0px" }}>Tất cả cuộc họp</p>
                          <input type="radio" name="number_meet" value="1"></input>
                        </label>
                      </div>
                      <div className={`all_metting ${activeTab === 'scheduling' ? 'active' : ''}`}
                        onClick={() => handleTabClick('scheduling')} >
                        <label className="wind_alm windo_tow">
                          <p className="numb_mett" style={{ margin: "0px" }}>{count.isComing}</p>
                          <p className="note_mett" style={{ margin: "0px" }}>Cuộc họp sắp diễn ra</p>
                          <input type="radio" name="number_meet" value="1"></input>
                        </label>
                      </div>
                      <div className={`all_metting ${activeTab === 'createdByMe' ? 'active' : ''}`}
                        onClick={() => handleTabClick('createdByMe')} >
                        <label className="wind_alm windo_three">
                          <p className="numb_mett" style={{ margin: "0px" }}>{count.byMe}</p>
                          <p className="note_mett" style={{ margin: "0px" }}>Cuộc họp tạo bởi tôi</p>
                          <input type="radio" name="number_meet" value="1"></input>
                        </label>
                      </div>
                      <div className={`all_metting ${activeTab === 'cancelled' ? 'active' : ''}`}
                        onClick={() => handleTabClick('cancelled')} >
                        <label className="wind_alm windo_four">
                          <p className="numb_mett" style={{ margin: "0px" }}>{count.cancel}</p>
                          <p className="note_mett" style={{ margin: "0px" }}>Cuộc họp bị hủy</p>
                          <input type="radio" name="number_meet" value="1"></input>
                        </label>
                      </div>
                    </div>
                    {activeTab === 'all' && <div>
                      <TodayMeeting 
                        data = {allMeeting?.meetingToday}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor} 
                      />
                      <Meeting_ST
                        data = {allMeeting?.meetingIsComing}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor}
                      />
                      <Meeting_DQ setActiveKey={setActiveKey}
                        data = {allMeeting?.meetingDone}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor} /></div>}
                    {activeTab === 'scheduling' && <div>
                      <TodayMeeting 
                        data = {isComingMeeting?.meetingToday}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor} 
                      />
                      <Meeting_ST
                        data = {isComingMeeting?.meetingIsComing}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor}
                      />
                      <Meeting_DQ 
                        data = {isComingMeeting?.meetingDone} 
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor}
                      />
                    </div>}
                    {activeTab === 'createdByMe' && <div>
                      <TodayMeeting 
                        data = {createdByMe?.meetingToday}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor} 
                      />
                      <Meeting_ST
                        data = {createdByMe?.meetingIsComing}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor}
                      />
                      <Meeting_DQ 
                        data = {createdByMe?.meetingDone}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor} 
                      />
                    </div>}
                    {activeTab === 'cancelled' && <div>
                      <TodayMeeting 
                        data = {cancelMeeting?.meetingToday}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor} 
                      />
                      <Meeting_ST
                        data = {cancelMeeting?.meetingIsComing}
                        setActiveKey={setActiveKey}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor}
                      />
                      <Meeting_DQ setActiveKey={setActiveKey}
                        data = {cancelMeeting?.meetingDone}
                        setOpenKeys={setActiveKey}
                        selectedColor={selectedColor} /></div>}
                  </div>
                </div>
              ) : (
                // Nhan Viên==============//??????????????????????
                <div>
                  <form action="">
                    <div className="form_searchch">
                      <p></p>
                      <div className="searchcv">
                        <Search placeholder="Tìm kiếm cuộc họp" onSearch={onSearch} />
                      </div>
                    </div>
                  </form>
                  <div className="scrollmobile" id="navbar_meeting">
                    <div className="navbar" >
                      <div className={`all_metting ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => handleTabClick('all')} >
                        <label className="wind_alm windo_one">
                          <p className="numb_mett" style={{ margin: "0px" }}>{count.all}</p>
                          <p className="note_mett" style={{ margin: "0px" }}>Tất cả cuộc họp</p>
                          <input type="radio" name="number_meet" value="1"></input>
                        </label>
                      </div>
                      <div className={`all_metting ${activeTab === 'scheduling' ? 'active' : ''}`}
                        onClick={() => handleTabClick('scheduling')} >
                        <label className="wind_alm windo_tow">
                          <p className="numb_mett" style={{ margin: "0px" }}>{count.isComing}</p>
                          <p className="note_mett" style={{ margin: "0px" }}>Cuộc họp sắp diễn ra</p>
                          <input type="radio" name="number_meet" value="1"></input>
                        </label>
                      </div>
                      <div className={`all_metting ${activeTab === 'createdByMe' ? 'active' : ''}`}
                        onClick={() => handleTabClick('createdByMe')} >
                        <label className="wind_alm windo_three">
                          <p className="numb_mett" style={{ margin: "0px" }}>{count.byMe}</p>
                          <p className="note_mett" style={{ margin: "0px" }}>Cuộc họp tạo bởi tôi</p>
                          <input type="radio" name="number_meet" value="1"></input>
                        </label>
                      </div>
                      <div className={`all_metting ${activeTab === 'cancelled' ? 'active' : ''}`}
                        onClick={() => handleTabClick('cancelled')} >
                        <label className="wind_alm windo_four">
                          <p className="numb_mett" style={{ margin: "0px" }}>{count.cancel}</p>
                          <p className="note_mett" style={{ margin: "0px" }}>Cuộc họp bị hủy</p>
                          <input type="radio" name="number_meet" value="1"></input>
                        </label>
                      </div>
                    </div>
                    {activeTab === 'all' && (
                      <div>
                        <TodayMeeting 
                          data = {allMeeting?.meetingToday}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor} />
                        <Meeting_ST
                          data = {allMeeting?.meetingIsComing}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor}
                        />
                        <Meeting_DQ 
                          data = {allMeeting?.meetingDone}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor} 
                        />
                      </div>
                    )}
                    {activeTab === 'scheduling' && (
                      <div>
                        <TodayMeeting 
                          data = {isComingMeeting?.meetingToday}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor} 
                        />
                        <Meeting_ST
                          data = {isComingMeeting?.meetingIsComing}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor}
                        />
                        <Meeting_DQ 
                          data = {isComingMeeting?.meetingDone}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor} 
                        />
                      </div>
                    )}
                    {activeTab === 'createdByMe' && (
                      <div>
                        <TodayMeeting 
                          data = {createdByMe?.meetingToday}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor} 
                        />
                        <Meeting_ST
                          data = {createdByMe?.meetingIsComing}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor}
                        />
                        <Meeting_DQ 
                          data = {createdByMe?.meetingDone}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor} 
                        />
                      </div>
                    )}
                    {activeTab === 'cancelled' && (
                      <div>
                        <TodayMeeting 
                          data = {cancelMeeting?.meetingToday}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor} 
                        />
                        <Meeting_ST
                          data = {cancelMeeting?.meetingIsComing}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor}
                        />
                        <Meeting_DQ 
                          data = {cancelMeeting?.meetingDone}
                          setActiveKey={setActiveKey}
                          setOpenKeys={setActiveKey}
                          selectedColor={selectedColor} 
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div >
  );
}
