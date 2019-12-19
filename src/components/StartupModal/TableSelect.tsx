import React, { useState } from "react";
import styled from "@emotion/styled";
import theme from "../../styles/theme";
import Button from "../Controls/Button";
import {
  connectPlayer,
  closeStartupModal,
  updateStateValue,
  setUserSeat
} from "../../store/actions";

// The table list is temporarily hardcoded
const tableList: {
  address: string;
  gameType: string;
  maxPlayers: number;
  name: string;
  players: number;
  seat: string;
  stakes: string;
}[] = [
  {
    address: "78.141.203.106",
    gameType: "NL Hold'Em",
    maxPlayers: 2,
    name: "Public Beta 1",
    players: 0,
    stakes: "1/2",
    seat: "player1"
  },
  {
    address: "217.69.12.238",
    gameType: "NL Hold'Em",
    maxPlayers: 2,
    name: "Public Beta 2",
    players: 0,
    stakes: "1/2",
    seat: "player2"
  }
];

const ButtonWrapper = styled.div`
  text-align: center;
  padding-top: 1rem;
`;

const Table = styled.table`
  border-spacing: 0;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  text-align: center;
  width: 100%;

  tbody {
    padding: 0.5rem;

    & tr.selected {
      background-color: ${theme.moon.colors.primaryLight};
      color: ${theme.moon.colors.background};
      cursor: default;
    }

    & tr:hover:not(.selected) {
      background-color: ${theme.moon.colors.accent};
      color: ${theme.moon.colors.background};
    }
  }

  td {
    font-family: "PT Sans", sans-serif;
    font-weight: 400;
    padding: 0.25rem;
  }

  thead {
    & tr {
      background-color: ${theme.moon.colors.background};

      & th {
        padding-bottom: 0.25rem;
      }
    }
  }
`;

const TableArea = styled.div`
  background-color: ${theme.moon.colors.darkGray};
  height: 8.5rem;
  overflow: scroll;
`;

const TableSelect = ({ dispatch }) => {
  const [selectedTable, setSelectedTable] = useState();

  const handleSelect = (index: number) => {
    setSelectedTable(tableList[index]);
  };

  const handleSubmit = () => {
    const { address, seat } = selectedTable;
    const opponent = seat === "player1" ? "player2" : "player1";

    // Set up the table as a player node
    updateStateValue("nodeType", "player", dispatch);

    // Set the IP for player1
    updateStateValue(
      "nodes",
      {
        [seat]: address
      },
      dispatch
    );

    // Choose the player's seat
    // TODO: Needs to be set later, when the palyer clicks on the Player Widget with "SIT HERE"
    setUserSeat(seat, dispatch);

    // Connect the opponent player
    // TODO: Later connections will have to handled based on messages from the backend
    connectPlayer(opponent, dispatch);

    // Close the startup modal
    closeStartupModal(dispatch);
  };

  const isSelected = index => {
    return tableList[index] === selectedTable;
  };

  return (
    <section>
      <h2>Select a Table to Join</h2>
      <TableArea>
        <Table>
          <thead>
            <tr>
              <th scope="col">Table</th>
              <th scope="col">Game Type</th>
              <th scope="col">Stakes</th>
              <th scope="col">Players</th>
            </tr>
          </thead>
          <tbody>
            {tableList.map((table, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={isSelected(index) ? "selected" : undefined}
                >
                  <td>{table.name}</td>
                  <td>{table.gameType}</td>
                  <td>{table.stakes}</td>
                  <td>
                    {table.players}/{table.maxPlayers}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableArea>

      <ButtonWrapper>
        <Button
          label="Join Table"
          disabled={!selectedTable}
          onClick={e => {
            e.preventDefault();
            handleSubmit();
          }}
        />
      </ButtonWrapper>
    </section>
  );
};

export default TableSelect;
