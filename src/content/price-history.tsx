import React from "react";
import { AiOutlineLineChart, AiOutlineCloseCircle } from "react-icons/ai";
import Modal from 'react-modal';
import PriceHistoryChart from "./price-history-chart";
import {Size} from "../model/size";

const customStyles = {
  content: {
    height: '90vh',
  },
  overlay: { zIndex: 1000 }
};

interface PriceHistoryProps {
  searchData: Size
}

Modal.setAppElement('body');

const PriceHistory: React.FC<PriceHistoryProps>= (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <span>
      <span onClick={openModal} style={{ cursor: "pointer" }}><AiOutlineLineChart /></span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <span style={{ float: "right", cursor: "pointer" }} onClick={closeModal}><AiOutlineCloseCircle /></span>
        <div style={{ width: "auto" }}>
          <PriceHistoryChart searchData={props.searchData} />
        </div>
      </Modal>
    </span>
  )
}

export default PriceHistory
