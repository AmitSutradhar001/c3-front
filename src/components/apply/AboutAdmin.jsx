import "../../css/components/apply/AboutAdmin.css";

const AboutAdmin = ({ data }) => {
  return (
    <div className="ab-outer">
      <h2 className="ab-h2">About Project</h2>
      <p className="ab-p">
        {data?.content
          ? data.content
          : "Nulla ac ultrices sed ornare molestie in eget in. Aliquet duis purus libero enim aliquam ultricies dui scelerisque. Vitae pharetra non praesent vulputate ultrices. Tempor semper ut nisi ac. Elementum commodo ut leo aliquet aliquam. Varius faucibus aliquam tellus elementum eu ullamcorper orci ipsum. Orci erat rhoncus posuere a vel vivamus elit tellus sit."}
      </p>
    </div>
  );
};

export default AboutAdmin;
