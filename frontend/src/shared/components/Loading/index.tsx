import React from "react";
import { Spinner } from "react-bootstrap";
import style from "./loading.module.css"

interface ILoadingProps {
  loading: boolean;
}

export const Loading: React.FC<ILoadingProps> = ({ loading }) => {
  return (
    loading ? (
      <div className={style.container}>
        <Spinner animation="border" />
      </div>
    ) : <></>
  );
};
