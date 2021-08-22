import "./messege.css";

export default function Messege({ own }) {
  return (
    <div className={own ? "messege own" : "messege"}>
      <div className="top">
        <img className="img" src="/assets/person/1.jpg" alt="" />
        <p className="text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quas
          dolorem maiores cumque sint natus
        </p>
      </div>
      <div className="bottom">1 hour ago</div>
    </div>
  );
}
