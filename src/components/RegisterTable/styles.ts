import styled from "styled-components";

export const RegisterTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1.5rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 1100px;
  border-collapse: collapse;
  color: #cdd6f4;
  background: #1e1e2e;

  th,
  td {
    padding: 0.75rem;
    border-bottom: 1px solid #313244;
    text-align: left;
    white-space: nowrap;
  }

  th {
    color: #a6adc8;
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  td > button {
    width: 100%;
    border: 0;
    padding: 0;
    color: inherit;
    text-align: left;
    background: transparent;
    cursor: pointer;
  }

  td > button:hover {
    color: #86c62d;
  }

  tbody tr:hover {
    background: rgba(49, 50, 68, 0.45);
  }
`;

export const CellInput = styled.input`
  width: 100%;
  min-width: 110px;
  box-sizing: border-box;
  border: 1px solid #08692d;
  border-radius: 4px;
  padding: 0.35rem;
  color: #cdd6f4;
  background: #313244;
  outline: none;
`;

export const CellSelect = styled.select`
  width: 100%;
  min-width: 110px;
  border: 1px solid #08692d;
  border-radius: 4px;
  padding: 0.35rem;
  color: #cdd6f4;
  background: #313244;
  outline: none;
`;

export const ActionsCell = styled.td`
  display: flex;
  gap: 0.35rem;
`;

export const ActionButton = styled.button`
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid #45475a;
  border-radius: 4px;
  color: #cdd6f4;
  background: transparent;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: #86c62d;
    color: #86c62d;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;