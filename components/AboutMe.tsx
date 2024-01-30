import Image, { StaticImageData } from "next/image";
import React from "react";

type AboutMeProps = {
  picture: StaticImageData;
  name: string;
  statement: string;
  hometown: string;
};

const AboutMe: React.FC<AboutMeProps> = ({
  picture,
  name,
  statement,
  hometown,
}) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
    overflow: "hidden",
  };

  const pictureStyle: React.CSSProperties = {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    marginRight: "16px",
    objectFit: "cover",
  };

  const detailsStyle: React.CSSProperties = {
    flex: 1,
  };

  return (
    <div className="about-me-container">
      <Image
        src={picture}
        alt={`${name}'s profile`}
        style={pictureStyle}
        className="profile-picture"
      />
      <div className="details-container">
        <h2>{name}</h2>
        <p>
          <strong>Statement:</strong> {statement}
        </p>
        <p>
          <strong>Hometown:</strong> {hometown}
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
