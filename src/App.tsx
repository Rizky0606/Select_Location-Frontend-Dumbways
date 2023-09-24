import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface DataProvinces {
  id: number;
  name: string;
}

interface DataRegencies {
  id: number;
  name: string;
}

interface DataSubdistricts {
  id: number;
  name: string;
}

interface DataWards {
  id: number;
  name: string;
}

interface State {
  dataProvince: DataProvinces[] | null;
  dataRegencie: DataRegencies[] | null;
  dataSubdistrict: DataSubdistricts[] | null;
  dataWard: DataWards[] | null;
  getProvince: string;
  getRegencie: string;
  getSubdistrict: string;
  getWard: string;
  dataUser: any;
}

export default class App extends Component<{ value?: string }, State> {
  constructor(props: { value: "" }) {
    super(props);
    this.state = {
      dataProvince: null,
      dataRegencie: null,
      dataSubdistrict: null,
      dataWard: null,
      getProvince: "",
      getRegencie: "",
      getSubdistrict: "",
      getWard: "",
      dataUser: {},
    };
  }

  componentDidMount() {
    this.fetchProvince();
    // this.handleSubmitData();
  }

  componentDidUpdate() {
    this.fetchRegencies();
    this.fetchSubdistricts();
    this.fetchWards();
    // this.handleSubmitData();
  }

  fetchProvince() {
    try {
      fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
        // fetch("http://localhost:5000/api/v1/province", {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE",
        //   },
        // })
        .then((res) => res.json())
        .then((data) => {
          // const dataArray = Array.isArray(data) ? data : [data];
          this.setState({ dataProvince: data });
          // console.log(this.state.data);
        })
        .catch((err) => console.log(`Fetching Error ${err}`));
    } catch (error) {
      console.log(error);
    }
  }

  fetchRegencies() {
    try {
      if (this.state.getProvince !== "") {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${this.state.getProvince}.json`
        )
          // fetch("http://localhost:5000/api/v1/regency")
          .then((res) => res.json())
          .then((data) => {
            this.setState({ dataRegencie: data });
          })
          .catch((err) => console.log(`Fetching Error ${err}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchSubdistricts() {
    try {
      if (this.state.getRegencie !== "") {
        fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${this.state.getRegencie}.json`
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState({ dataSubdistrict: data });
          })
          .catch((err) => console.log(`Fetching Error ${err}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchWards() {
    try {
      if (this.state.getSubdistrict !== "") {
        fetch(
          `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${this.state.getSubdistrict}.json`
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState({ dataWard: data });
          })
          .catch((err) => console.log(`Fetching Error ${err}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmitData = () => {
    const { dataProvince, dataRegencie, dataSubdistrict, dataWard } =
      this.state;

    // Cara 1
    // const province = dataProvince?.filter((data) => {
    //   return this.state.getProvince === data.id.toString();
    // });

    // const regencie = dataRegencie?.filter((data) => {
    //   return this.state.getRegencie === data.id.toString();
    // });

    // const subdistrict = dataSubdistrict?.filter((data) => {
    //   return this.state.getSubdistrict === data.id.toString();
    // });

    // const ward = dataWard?.filter((data) => {
    //   return this.state.getWard === data.id.toString();
    // });

    // Cara 2
    const province = dataProvince?.find(
      (data) => this.state.getProvince === data.id.toString()
    )?.name;

    const regencie = dataRegencie?.find(
      (data) => this.state.getRegencie === data.id.toString()
    )?.name;

    const subdistrict = dataSubdistrict?.find(
      (data) => this.state.getSubdistrict === data.id.toString()
    )?.name;

    const ward = dataWard?.find(
      (data) => this.state.getWard === data.id.toString()
    )?.name;

    const dataUser = {
      province,
      regencie,
      subdistrict,
      ward,
    };

    this.setState({ dataUser: dataUser });
  };

  render() {
    const { dataProvince, dataRegencie, dataSubdistrict, dataWard } =
      this.state;

    return (
      <div style={{ margin: "70px", fontSize: "20px" }}>
        <div>
          <h1>Where Do You Live?</h1>
        </div>
        <InputSelect
          data={dataProvince}
          label={"Provinces"}
          onChangeData={(e: any) =>
            this.setState({ getProvince: e.target.value })
          }
        />
        <InputSelect
          data={dataRegencie}
          label={"Regencies"}
          onChangeData={(e: any) =>
            this.setState({ getRegencie: e.target.value })
          }
        />
        <InputSelect
          data={dataSubdistrict}
          label={"Subdistricts"}
          onChangeData={(e: any) =>
            this.setState({ getSubdistrict: e.target.value })
          }
        />
        <InputSelect
          data={dataWard}
          label={"Wards"}
          onChangeData={(e: any) => this.setState({ getWard: e.target.value })}
        />
        {/* <Button
          variant="primary"
          style={{ marginTop: "30px", width: "100px" }}
          onClick={() => this.handleSubmitData()}
        >
          Submit
        </Button> */}
        {this.state.getProvince !== "" &&
        this.state.getRegencie !== "" &&
        this.state.getSubdistrict !== "" &&
        this.state.getWard !== "" ? (
          <Button
            variant="primary"
            style={{ marginTop: "30px", width: "100px" }}
            onClick={() => this.handleSubmitData()}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="secondary"
            style={{ marginTop: "30px", width: "100px" }}
            disabled
          >
            Submit
          </Button>
        )}
        {this.state.getProvince === "" ||
        this.state.getRegencie === "" ||
        this.state.getSubdistrict === "" ||
        this.state.getWard === "" ? (
          <></>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <h3>Province : {this.state.dataUser.province}</h3>
            <h3>Regencie : {this.state.dataUser.regencie}</h3>
            <h3>Subdistrict : {this.state.dataUser.subdistrict}</h3>
            <h3>Ward : {this.state.dataUser.ward}</h3>
          </div>
        )}
      </div>
    );
  }
}

const InputSelect = ({ data, label, onChangeData }: any) => {
  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <label>{label}</label>
        <Form.Select style={{ marginTop: "10px" }} onChange={onChangeData}>
          <option value="" hidden>
            Select a {label}
          </option>
          {data &&
            data.map((item: any) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
        </Form.Select>
      </div>
    </>
  );
};
