import React, { useEffect, useState } from "react";

//필수 설치 tailwindcss,  @heroicons/react
//tailwindcss ^3.4.1, @heroicons/react ^2.1.1 설치 테스트
const MyPagination = ({
  totalPage, // 총 페이지수
  pageRangeDisplayed, // 페이징 블럭 수
  activePage, //현재 페이지
  onPageChange, //페이지 변경 함수(set함수)
  prevLabel = false, //이전, 첫 페이지 이동 버튼 출력 여부
  nextLabel = false, //다음 마지막 페이지 이동 버튼 출력 여부
}) => {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  useEffect(() => {
    if (activePage % pageRangeDisplayed === 0) {
      setCurrentPageArray(
        totalPageArray[Math.floor(activePage / pageRangeDisplayed) - 1]
      );
    } else {
      setCurrentPageArray(
        totalPageArray[Math.floor(activePage / pageRangeDisplayed)]
      );
    }
  }, [activePage]);

  useEffect(() => {
    const slicePageArray = sliceArrayByLimit(totalPage, pageRangeDisplayed);
    setTotalPageArray(slicePageArray);
    setCurrentPageArray(slicePageArray[0]);
  }, [totalPage]);

  return (
    <div className="PaginationWrapper">
      {prevBtn(activePage, onPageChange, prevLabel)}
      {currentPageArray?.map((i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={activePage === i + 1 ? "page-btn active" : "page-btn"}
        >
          {i + 1}
        </button>
      ))}
      {nextBtn(activePage, onPageChange, totalPage, nextLabel)}
    </div>
  );
};

const prevBtn = (page, setPage, prevLabel) => {
  return (
    <>
      {prevLabel && page !== 1 ? (
        <>
          <button className="page-btn" onClick={() => setPage(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button className="page-btn" onClick={() => setPage(page - 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </>
      ) : null}
    </>
  );
};

const nextBtn = (page, setPage, totalPage, nextLabel) => {
  return (
    <>
      {nextLabel && page !== totalPage ? (
        <>
          <button className="page-btn" onClick={() => setPage(page + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <button className="page-btn" onClick={() => setPage(totalPage)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </>
      ) : null}
    </>
  );
};

const sliceArrayByLimit = (totalPage, limit) => {
  //페이지 블럭 생성 1~5 6~10....

  //임시 배열 하나에 0 ~ totalPage까지 숫자 데이터 생성
  const totalPageArray = Array(totalPage)
    .fill()
    .map((_, i) => i);

  //위에 생성한 totalPageArray과 limit를 사용하여 페이지 블럭 생성
  return Array(Math.ceil(totalPage / limit))
    .fill()
    .map(() => totalPageArray.splice(0, limit));
};

export default MyPagination;
