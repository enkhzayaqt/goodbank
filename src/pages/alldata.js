import React, { useContext } from "react";
import Card from "../components/card";
import { UserContext } from "../context";

export default function AllData() {
  const ctx = useContext(UserContext);

  return (
    <Card
      maxWidth="none"
      bgcolor="light"
      headerbg="dark"
      header="Activity log"
      body={
        <div>
          <div className="table-responsive">
            <table id="userTab" className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {ctx.activities.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.action}</td>
                    <td>{item.stamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    />
  );
}
