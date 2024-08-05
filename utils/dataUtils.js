import { format, parseISO } from 'date-fns';
import { pos } from '@/components/Department/index.tsx';
export const formatDate = (date) => {
  let parsedDate;

  if (typeof date === 'number') {
    parsedDate =
      date.toString().length === 13 ? new Date(date) : new Date(date * 1000);
  } else if (typeof date === 'string') {
    parsedDate = parseISO(date);
  }

  if (parsedDate instanceof Date && !isNaN(parsedDate)) {
    return format(parsedDate, 'dd/MM/yyyy');
  } else {
    return '';
  }
};
///

export function convertDateFormat(dateString) {
  // Tách ngày, tháng và năm từ chuỗi đầu vào
  const [day, month, year] = dateString.split('-');

  // Tạo chuỗi mới theo định dạng "dd/mm/yyyy"
  const newDateString = `${day}/${month}/${year}`;

  return newDateString;
}

export function reverseDate(dateString) {
  const dateParts = dateString ? dateString.split('-') : [];
  if (dateParts.length === 3) {
    const [day, month, year] = dateParts;
    return `${year}-${month}-${day}`;
  } else {
    // Nếu định dạng ngày không chính xác, trả về chuỗi gốc
    return dateString;
  }
}

export function calculateTaskStatus(project) {
  const currentDate = new Date();
  const startDate = new Date(
    `${convertDateFormat2(project.date_start)}T${project.time_in}:00`
  );
  const endDate = new Date(
    `${convertDateFormat2(project.date_end)}T${project.time_out}:00`
  );
  if (project.type === 1) {
    return <div style={{ color: '#34B632' }}>Hoàn thành</div>;
  }
  if (project.type === 2) {
    return <div style={{ color: '#FF3333' }}>Thất bại</div>;
  }
  if (project.type === 0 && currentDate.getTime() <= endDate.getTime()) {
    return <div style={{ color: '#4C5BD4' }}>Đang thực hiện</div>;
  }
  if (project.type === 0 && currentDate.getTime() > endDate.getTime()) {
    <div style={{ color: '#FF3333' }}>Quá hạn</div>;
  }
  return 'Không xác định';
}

export function calculateTaskStatusJ(project) {
  const currentDate = new Date();
  const startDate = new Date(
    `${convertDateFormat2(project.date_start)}T${project.time_in}:00`
  );
  const endDate = new Date(
    `${convertDateFormat2(project.date_end)}T${project.time_out}:00`
  );

  if (project.status_or_late === 2) {
    return 'Hoàn thành';
  }
  if (project.status_or_late === 3) {
    return 'Hoàn thành muộn';
  }
  if (
    project.status_or_late === 1 &&
    currentDate.getTime() <= endDate.getTime()
  ) {
    return 'Đang thực hiện ';
  }
  if (
    project.status_or_late === 1 &&
    currentDate.getTime() > endDate.getTime()
  ) {
    return 'Quá hạn';
  }
  return 'Không xác định';
}
export function calculateTaskStatusG(project) {
  const currentDate = new Date();
  const startDate = new Date(
    `${convertDateFormat2(project?.date_start)}T${project?.time_in}:00`
  );
  const endDate = new Date(
    `${convertDateFormat2(project?.date_end)}T${project?.time_out}:00`
  );
  if (project?.job_group_status === 1) {
    return 'Hoàn thành';
  } else if (
    project?.job_group_status === 0 &&
    endDate?.getTime() < currentDate?.getTime()
  ) {
    return 'Quá hạn';
  } else if (
    project?.job_group_status === 0 &&
    endDate?.getTime() >= currentDate?.getTime()
  ) {
    return 'Đang thực hiện';
  }
  return 'Không xác định';
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0'); // Thêm số 0 vào đầu nếu cần
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Thêm số 0 vào đầu nếu cần

  const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

  return formattedDate;
}

function chuyenDoiNgay(ngay) {
  var ngayThang = ngay.split('-');
  var ngayMoi = ngayThang[1] + '/' + ngayThang[0] + '/' + ngayThang[2];
  return ngayMoi;
}
export function compareDatesAndTimes(dateStart, dateEnd, timeStart, timeEnd) {
  const startDate = new Date(chuyenDoiNgay(dateStart));
  const endDate = new Date(chuyenDoiNgay(dateEnd));
  const startTime = new Date(`1970-01-01T${timeStart}:00`);
  const endTime = new Date(`1970-01-01T${timeEnd}:00`);
  if (startDate > endDate) {
    alert('Ngày bắt đầu phải trước ngày kết thúc');
    return true;
  }
  if (startDate.getTime() == endDate.getTime() && startTime >= endTime) {
    alert('Trong cùng ngày giờ bắt đầu phải trước giờ kết thúc');
    return true;
  }
  return false;
}

function convertDateFormat2(dateString) {
  const parts = dateString?.split('-');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return `${year}-${month}-${day}`;
}

export function fValidDate(ObjDateOne, ObjDateTwo, chuoi) {
  const startDateOne = new Date(
    `${convertDateFormat2(ObjDateOne?.date_start)}T${ObjDateOne?.time_in}:00`
  );
  const startDateTwo = new Date(
    `${convertDateFormat2(ObjDateTwo?.date_start)}T${ObjDateTwo?.time_in}:00`
  );
  const endDateOne = new Date(
    `${convertDateFormat2(ObjDateOne?.date_end)}T${ObjDateOne?.time_out}:00`
  );
  const endDateTwo = new Date(
    `${convertDateFormat2(ObjDateTwo?.date_end)}T${ObjDateTwo?.time_out}:00`
  );

  if (
    startDateOne.getTime() < startDateTwo.getTime() ||
    endDateOne.getTime() > endDateTwo.getTime()
  ) {
    alert(
      `Ngày bắt đầu và ngày kết thúc phải trong khoẳng thời gian bắt đầu và kết thúc của ${chuoi} ${ObjDateTwo?.time_in} ${ObjDateTwo?.date_start} ->${ObjDateTwo?.time_out} ${ObjDateTwo?.date_end}`
    );
    return true;
  }

  if (
    startDateOne.getTime() == startDateTwo.getTime() ||
    endDateOne.getTime() == endDateTwo.getTime()
  ) {
    alert(`Trong cùng ngày giờ bắt đầu phải trước giờ kết thúc`);
    return true;
  }
  return false;
}

export function compareDateJobOfJob(ObjDateOne, date, hour) {
  const startDateOne = new Date(
    `${convertDateFormat2(ObjDateOne?.date_start)}T${ObjDateOne?.time_in}:00`
  );
  const endDateOne = new Date(
    `${convertDateFormat2(ObjDateOne?.date_end)}T${ObjDateOne?.time_out}:00`
  );
  const dateCompare = new Date(`${date}T${hour}:00`);
  if (
    dateCompare.getTime() < startDateOne.getTime() ||
    dateCompare.getTime() > endDateOne.getTime()
  ) {
    alert(
      `Ngày bắt đầu và ngày kết thúc phải trong khoẳng thời gian bắt đầu và kết thúc của công việc ${ObjDateOne?.time_in} ${ObjDateOne?.date_start} ->${ObjDateOne?.time_out} ${ObjDateOne?.date_end}`
    );
    return true;
  }

  return false;
}
export function convertTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Nhân với 1000 để chuyển đổi từ giây sang mili giây

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Vì tháng được đếm từ 0, nên cần cộng thêm 1
  const year = date.getFullYear().toString();

  const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

  return formattedDate;
}

export function chucVu(value) {
  var result = pos.filter((item) => item.value === value);
  return result?.[0]?.label.toLowerCase();
}
