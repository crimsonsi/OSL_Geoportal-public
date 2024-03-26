import React from "react";
import northarrow from "../../assets/imgs/north-arrow.png";

const SearchReport = ({ blob, body }) => {
  const doc = {
    backgroundColor: "white",
    padding: "12px",
    width: "890px",
    height: "fit-content",
    margin: "auto",
  };

  const border = {
    border: "1px solid black",
    padding: "6px",
    width: "100%",
    height: "100%",
  };

  const header = {
    borderBottom: "1px solid black",
    textAlign: "center",
    margin: "0 0 12px 0",
    padding: "6px",
  };

  return (
    <div style={doc}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          padding: "12px",
          gap: "10px",
          width: "100%",
          height: "100%",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            gap: "10px",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "medium",
            }}
          >
            {body.Title}
          </h3>

          <div style={border}>
            <img
              style={{
                width: "100%",
                height: "fit-content",
                objectFit: "contain",
                display: "block",
                margin: "auto",
              }}
              src={blob}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              padding: "0px",
              gap: "10px",
            }}
          >
            <div style={{ border: "1px solid black", padding: "10px" }}>
              <h4
                style={{
                  fontSize: "small",
                  fontWeight: "600",
                  marginBottom: "6px",
                }}
              >
                Legend
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {body?.Data[0]?.style?.classes ? (
                  body?.Data[0].style.classes.length > 0 &&
                  body?.Data[0].style.classes.map((item, index) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          margin: "3px",
                        }}
                      >
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: item.color,
                            margin: "2px",
                          }}
                        ></div>
                        <p
                          style={{
                            marginLeft: "10px",
                            fontSize: "x-small",
                            textTransform: "capitalize",
                          }}
                          key={index}
                        >
                          {item.name}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p>This data has no legend</p>
                )}
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: "small",
                  textAlign: "center",
                }}
              >
                1:10000
              </p>
              <br></br>
              <div>
                <img
                  style={{
                    width: "24px",
                    objectFit: "contain",
                    margin: "auto",
                    display: "block",
                  }}
                  src={northarrow}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p
            style={{
              fontSize: "x-small",
              textAlign: "center",
              padding: "0px",
            }}
          >
            Oakar Services Data Portal
          </p>
          <p>
            <pre
              style={{
                fontSize: "x-small",
                textAlign: "center",
                display: "block",
                padding: "0px",
                color: "blue",
                whiteSpace: "nowrap",
              }}
            >
              https:// datahub.ksa.go.ke
            </pre>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchReport;
