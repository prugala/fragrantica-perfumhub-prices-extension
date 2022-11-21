import React from "react";
import Modal from 'react-modal';
import {Provider} from "../provider/provider";
import {AiOutlineCloseCircle} from "react-icons/ai";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        minWidth: '400px',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {zIndex: 1000}
};

interface PriceHistoryProps {
    provider: Provider | null
    foundPrices: boolean,
    page: string,
    id: number
}

Modal.setAppElement('body');

const ReportPrices: React.FC<PriceHistoryProps> = (props) => {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [showErrorMessage, setErrorSuccessMessage] = React.useState(false);
    const [urlIsValid, setUrlIsValid] = React.useState(false);
    const [url, setUrl] = React.useState(null);

    function openModal() {
        setModalIsOpen(true);
        setShowSuccessMessage(false);
        setErrorSuccessMessage(false);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function validateUrl(event: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent) {
        // @ts-ignore
        const value = event.target?.value;

        if (value.includes(props.provider?.getName() ?? 'provider')) {
            setUrlIsValid(true);
        } else {
            setUrlIsValid(false)
        }

        setUrl(value)
    }

    function send() {
        setShowSuccessMessage(false);
        setErrorSuccessMessage(false);

        if (!urlIsValid) {
            return;
        }
        fetch(props.provider?.getApiHost() + '/report-link/' + props.provider?.getName(), {
            method: "POST",
            body: JSON.stringify({url: url, page: props.page, id: props.id})
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('error');
                }
            })
            .then(() => {
                setShowSuccessMessage(true);
                setErrorSuccessMessage(false)
            })
            .catch(() => {
                setShowSuccessMessage(false);
                setErrorSuccessMessage(true)
            })
    }

    return (
        <span>
      <a onClick={openModal} style={{marginBottom: "1rem", display: "block", cursor: "pointer"}}>{props.foundPrices ? chrome.i18n.getMessage('report_wrong_prices') : chrome.i18n.getMessage('report_missing_prices')}</a>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
      >
          <span style={{ float: "right", cursor: "pointer" }} onClick={closeModal}><AiOutlineCloseCircle /></span>
          <h3 style={{ color: "#212528" }}>{props.provider ? chrome.i18n.getMessage('report_wrong_prices') : chrome.i18n.getMessage('report_missing_prices')}</h3>
          <div>
              <span className="fld-input uk-form-controls">
                  <input type="url" name="newPricesUrl" placeholder={props.provider?.getHost() + '/...'} className={'uk-input'} onChange={validateUrl} onPaste={validateUrl} style={{border: !urlIsValid ? '1px solid #f50a0a' : '', marginBottom: '10px'}}></input>
              </span>
              <button className="button primary pbtn pbtn-blue" onClick={send}>{chrome.i18n.getMessage('send')}</button>
          </div>
          {showSuccessMessage && <div style={{color: '#45f542'}}>{chrome.i18n.getMessage('report_prices_success')}</div>}
          {showErrorMessage && <div style={{color: '#f50a0a'}}>{chrome.i18n.getMessage('report_prices_error')}</div>}
      </Modal>
    </span>
    )
}

export default ReportPrices
