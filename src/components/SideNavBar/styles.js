import { css } from "@emotion/react";

const styles = ({ location }) => {
  const baseNavItem = css`
    border-radius: 8px;
    transition: background-color 0.2s ease;
  `;

  const home = css`
    ${baseNavItem}
    background-color: ${location.pathname === "/dashboard" ? "#118B50" : "white"};
  `;

  const deliveryNote = css`
    ${baseNavItem}
    background-color: ${location.pathname === "/deliveryNote" ? "#118B50" : "white"};
  `;

  const invoice = css`
    ${baseNavItem}
    background-color: ${location.pathname === "/invoice" ? "#118B50" : "white"};
  `;

  const excess = css`
    ${baseNavItem}
    background-color: ${location.pathname === "/excess" ? "#118B50" : "white"};
  `;

  const po = css`
    ${baseNavItem}
    background-color: ${location.pathname === "/purchaseOrder" ? "#118B50" : "white"};
  `;

  const stock = css`
    ${baseNavItem}
    background-color: ${location.pathname === "/stock" ? "#118B50" : "white"};
  `;

  const addItems = css`
    ${baseNavItem}
    background-color: ${location.pathname === "/addItems" ? "#118B50" : "white"};
  `;

  const icon = css`
    color: #212121;
  `;

  return {
    home,
    deliveryNote,
    invoice,
    excess,
    po,
    stock,
    addItems,
    icon,
  };
};
export default styles;
