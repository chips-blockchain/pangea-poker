import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Controls/Button";
import {
  connectPlayer,
  closeStartupModal,
  game,
  updateStateValue,
  setUserSeat
} from "../../store/actions";
import { IState } from "../../store/initialState";
import { Table, TableArea, ModalButtonsWrapper } from "./assets/style";

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const TableSelect: React.FunctionComponent<IProps> = ({ dispatch, state }) => {
  const [tableList, setTableList] = useState([]);
  const [selectedTable, setSelectedTable] = useState();

  // API call to retrieve the list of tables
  useEffect(() => {
    const endpoint = process.env.TABLE_LIST_ENDPOINT;

    if (endpoint) {
      axios.get(endpoint).then(res => {
        const tables = res.data.sheet1;
        setTableList(tables);
      });
    } else
      console.warn(
        "No Table List API endpoint has been specified in the .env file."
      );
  }, []);

  const handleSelect = (index: number) => (): void => {
    setSelectedTable(tableList[index]);
  };

  const handleSubmit = () => (e: React.FormEvent<EventTarget>): void => {
    const { address, seat } = selectedTable;
    const opponent = seat === "player1" ? "player2" : "player1";

    e.preventDefault();

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
    // TODO: Needs to be set later, when the player clicks on the Player Widget with "SIT HERE"
    setUserSeat(seat, dispatch);

    // Connect the opponent player
    // TODO: Later connections will have to handled based on messages from the backend
    connectPlayer(opponent, dispatch);

    // Close the startup modal
    closeStartupModal(dispatch);

    // Initialize game
    game({ gametype: "", pot: [0] }, state, dispatch);
  };

  const isSelected = (index: number): boolean => {
    return tableList[index] === selectedTable;
  };

  return (
    <section>
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
                  onClick={handleSelect(index)}
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

      <ModalButtonsWrapper>
        <Button
          label="Join Table"
          disabled={!selectedTable}
          onClick={handleSubmit()}
        />
      </ModalButtonsWrapper>
    </section>
  );
};

export default TableSelect;
