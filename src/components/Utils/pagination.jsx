import React, { useState } from "react";
import { useEffect } from "react";

const Pagination = ({ totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / 12);
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(currentPage - halfVisiblePages, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  let pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  if (pageNumbers.length === 0) {
    pageNumbers = [1]
  }

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="cpagination">
      <i
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        className="fa fa-arrow-left"
      ></i>
      {currentPage > 5 && (
        <h5
          onClick={() => {
            handlePageChange(1);
          }}
        >
          {1}
        </h5>
      )}
      {currentPage > 5 && <p>...</p>}
      {pageNumbers.map((pageNumber) => (
        <h5
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
        >
          {pageNumber}
        </h5>
      ))}
      {pageNumbers.length === 5 && <p>...</p>}
      {pageNumbers.length === 5 && (
        <h5
          onClick={() => {
            handlePageChange(totalPages);
          }}
        >
          {totalPages}
        </h5>
      )}
      <i
        onClick={() => {
          if (currentPage < pageNumbers.length) {
            onPageChange(currentPage + 1);
          }
        }}
        className="fa fa-arrow-right"
      ></i>
    </div>
  );
};

export default Pagination;