import { css } from "@emotion/react";

const styles = ({ location }) => {
  const home = css`
    background-color:  ${location.pathname === "/dashboard" ? "#118B50" : "white"};
  `;

  const deliveryNote = css`
     background-color:  ${location.pathname === "/deliveryNote" ? "#118B50" : "white"};
  `;

  const invoice = css`
     background-color:  ${location.pathname === "/invoice" ? "#118B50" : "white"};
  `;

  const excess = css`
     background-color:  ${location.pathname === "/excess" ? "#118B50" : "white"};

  `;

  const po = css`
    background-color:  ${location.pathname === "/purchaseOrder" ? "#118B50" : "white"};
  `;

  const stock = css`
        background-color:  ${location.pathname === "/stock" ? "#118B50" : "white"};
  `;

  const addItems = css`
     background-color:  ${location.pathname === "/addItems" ? "#118B50" : "white"};
  `;

  const logout = css`
    border-radius: 40px;
    box-shadow: 0 0 1.3rem 0 #e5e1da;
    color: #F72C5B;
    font-size: 40px;
    padding: 5px;
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

  const icon = css`
      color: #212121;
  `

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
    logout,stock,icon
  };
};
export default styles;
