import { css } from "@emotion/react";

const styles = ({ location }) => {
  const home = css`
    border-radius: 40px;
    box-shadow: ${location.pathname === "/dashboard"
      ? "0 0 1rem 0 #CD8D7A"
      : "0 0 1.3rem 0 #E5E1DA"};
    color: ${location.pathname === "/dashboard" ? "#CD8D7A" : "black"};
    font-size: ${location.pathname === "/dashboard" ? "45px" : "40px"};
    padding: ${location.pathname === "/dashboard" ? "7px" : "5px"};
  `;

  const deliveryNote = css`
    border-radius: 40px;
    box-shadow: ${location.pathname === "/deliveryNote"
      ? "0 0 1rem 0 #9ade7b"
      : "0 0 1.3rem 0 #E5E1DA"};
    color: ${location.pathname === "/deliveryNote" ? "#9ade7b" : "black"};
    font-size: ${location.pathname === "/deliveryNote" ? "45px" : "40px"};
    padding: ${location.pathname === "/deliveryNote" ? "7px" : "5px"};
  `;

  const invoice = css`
    border-radius: 40px;
    box-shadow: ${location.pathname === "/invoice"
      ? "0 0 1rem 0 #FF9800"
      : "0 0 1.3rem 0 #E5E1DA"};
    color: ${location.pathname === "/invoice" ? "#FF9800" : "black"};
    font-size: ${location.pathname === "/invoice" ? "45px" : "40px"};
    padding: ${location.pathname === "/invoice" ? "7px" : "5px"};
  `;

  const excess = css`
    border-radius: 40px;
    box-shadow: ${location.pathname === "/excess"
      ? "0 0 1rem 0 #BF3131"
      : "0 0 1.3rem 0 #E5E1DA"};
    color: ${location.pathname === "/excess" ? "#BF3131" : "black"};
    font-size: ${location.pathname === "/excess" ? "45px" : "40px"};
    padding: ${location.pathname === "/excess" ? "7px" : "5px"};
  `;

  const po = css`
    border-radius: 40px;
    box-shadow: ${location.pathname === "/purchaseOrder"
      ? "0 0 1rem 0 #78c1f3"
      : "0 0 1.3rem 0 #E5E1DA"};
    color: ${location.pathname === "/purchaseOrder" ? "#78c1f3" : "black"};
    font-size: ${location.pathname === "/purchaseOrder" ? "45px" : "40px"};
    padding: ${location.pathname === "/purchaseOrder" ? "7px" : "5px"};
  `;

  const addItems = css`
    border-radius: 40px;
    box-shadow: ${location.pathname === "/addItems"
      ? "0 0 1rem 0 #ffb996"
      : "0 0 1.3rem 0 #E5E1DA"};
    color: ${location.pathname === "/addItems" ? "#ffb996" : "black"};
    font-size: ${location.pathname === "/addItems" ? "45px" : "40px"};
    padding: ${location.pathname === "/addItems" ? "7px" : "5px"};
  `;

  const save = css`
    border-radius: 40px;
    box-shadow: ${location.pathname === "/deliveryNote"
      ? "0 0 1rem 0 #92C7CF"
      : "0 0 1.3rem 0 #E5E1DA"};
    font-size: 45px;
    color: #ffb996;
    padding: 7px;
  `;

  const link = css`
    color: black;
    text-decoration: none;
    font-weight: 140px;
    font-size: 10px;
  `;

  const activeLink = css`
    color: #095936;
    text-decoration: none;
    font-weight: 200px;
    font-size: 20px;
  `;

  return {
    home,
    deliveryNote,
    invoice,
    excess,
    po,
    addItems,
    save,
    activeLink,
    link,
  };
};
export default styles;
