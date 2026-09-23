import { css } from "@emotion/react";

const styles = (theme) => {
  const gridContainer = css`
    flex-direction: column;
    flex-wrap: nowrap;
  `;

  const headingTitle = css`
    font-family: Nunito !important;
    font-weight: 700 !important;
    font-style: normal !important;
    font-size: 1.6rem !important;
    line-height: 1.5 !important;
    color: ${theme.palette.common.white};
  `;

  const helperTextSection = css`
    padding-top: 15px;
  `;

  const section = css`
    padding-top: 24px;
  `;

  const paper = css`
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 24, 71, 0.08);
    padding: 12px 16px;
    background-color: #bf3131;
    width: 100%;
  `;

  return {
    gridContainer,
    headingTitle,
    helperTextSection,
    section,
    paper,
  };
};

export default styles;
