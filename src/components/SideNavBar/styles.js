import { css } from "@emotion/react";

const styles = ({ location }) => {
  const baseNavItem = css`
    border-radius: 8px;
    transition: background-color 0.2s ease;
  `;

  const getNavItemStyle = (path) => css`
  ${baseNavItem}
  background-color: ${location.pathname === path ? "#118B50" : "white"};
`;

const home = getNavItemStyle("/dashboard");
const finance = getNavItemStyle("/finance");
const deliveryNote = getNavItemStyle("/deliveryNote");
const invoice = getNavItemStyle("/invoice");
const excess = getNavItemStyle("/excess");
const po = getNavItemStyle("/purchaseOrder");
const stock = getNavItemStyle("/stock");
const rawMaterialStock = getNavItemStyle("/rawMaterialStock");
const addItems = getNavItemStyle("/addItems");

  const icon = css`
    color: #212121;
  `;

  return {
    home,
    finance,
    deliveryNote,
    invoice,
    excess,
    po,
    stock,
    addItems,
    icon,
    rawMaterialStock
  };
};
export default styles;
