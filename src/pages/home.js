import Card from "../components/card";

export default function Home() {
  return (
    <Card
      txtcolor="black"
      header="Enkhzaya's BadBank"
      headerbg="dark"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={
        <img
          src="bank.png"
          className="img-fluid"
          alt="Responsive image"
          style={{
            width: 180,
          }}
        />
      }
    />
  );
}
