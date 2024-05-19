import * as React from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import type { ISpfxProps } from "./ISpfxProps";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type State = {
  items: { Id: number; Title: string; LastName: string }[];
};

export default class Lista extends React.Component<ISpfxProps, State> {
  private spWeb;

  constructor(props: ISpfxProps) {
    super(props);
    this.state = {
      items: [],
    };
    const sp = spfi().using(SPFx(this.props.context));
    this.spWeb = sp.web;
  }

  async componentDidMount() {
    try {
      await this.loadItems();
    } catch (error) {
      console.error("Error loading items in componentDidMount:", error);
    }
  }

  private async loadItems() {
    try {
      const items = await this.spWeb.lists
        .getByTitle("Dane")
        .items.select("Id", "Title", "LastName")
        .top(100)(); // Pobierz do 100 elementów
      this.setState({ items });
      console.log(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  private handleRefresh = async () => {
    try {
      await this.loadItems();
    } catch (error) {
      console.error("Error refreshing items:", error);
    }
  };

  private handleEdit = (id: number) => {
    // Implementacja funkcji edycji rekordu
    console.log("Edit item with ID:", id);
    // Tu możesz dodać nawigację do strony edycji
  };

  public render(): React.ReactElement<ISpfxProps> {
    const { hasTeamsContext, userDisplayName } = this.props;
    return (
      <section className={`${hasTeamsContext ? "teams" : "shadow"} p-5`}>
        <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300">
          <div className="text-4xl">Customer risk analysis - List</div>
          <div className="text-xl">{userDisplayName}</div>
        </div>
        <div className="p-5">
          <h3 className="text-2xl mb-4">Items from SharePoint list:</h3>{" "}
          {/* przenieść na lewą stronę */}
          <div className="flex items-end right-0 p-5">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleRefresh}
            >
              Odśwież listę
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.items.map((item) => (
                  <TableRow key={item.Id}>
                    <TableCell>{item.Title}</TableCell>
                    <TableCell>{item.LastName}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleEdit(item.Id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    );
  }
}
