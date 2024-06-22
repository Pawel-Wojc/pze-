import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return (
    <div style={{ display:"flex", justifyContent: "center", alignItems: "center" }}>
    <Spinner  animation="border" role="status" >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}
