import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Color from "color";
import { getColors } from "../feature/color/colorSlice";

const ColorList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getColors(user?.refreshToken));
  }, [dispatch]);
  const { colors = [] } = useSelector((state) => state.color) ?? {};
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Code</th>
                <th scope="col">Color</th>
              </tr>
            </thead>
            <tbody>
              {colors &&
                colors.length > 0 &&
                colors?.map(({ color, name }, index) => {
                  const pitch = Color(color);
                  const intent = pitch.rgb().array();
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{name}</td>
                      <td>{color}</td>
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor: `rgb(${intent[0]},${intent[1]},${intent[2]})`,
                            borderRadius: "10px",
                            width: "102px",
                            height: "30px",
                          }}
                        ></span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ColorList;
