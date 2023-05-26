const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log("isvalid: ", isValid)
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input className="form-control" id="number-input" type="number" width="200" onChange={onChange}></input>
        <hr></hr>
        <input className="btn btn-primary" disabled={isValid} type="submit" width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };
  
  const Account = () => {
  
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    React.useEffect(() => {
      if (atmMode === "Deposit") {
        console.log("ATM mode is Deposit");
        setIsDeposit(true);
      } else if (atmMode === "Cash Back") {
        console.log("ATM mode is Cash Back");
        setIsDeposit(false);
      }
    }, [atmMode]);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      if (event.target.value <= 0) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
        setDeposit(Number(event.target.value));
      }
  
      if (atmMode == "Cash Back" && event.target.value > totalState){
        setValidTransaction(false);
      }
    };
  
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
    };
  
    const handleModeSelect = (e) => {
      console.log(e.target.value);
      setAtmMode(e.target.value);
  
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total"><span className="badge rounded-pill text-bg-primary">{status}</span></h2>
        <label className="badge rounded-pill text-bg-primary">Select an action to continue</label>
        <select className="badge rounded-pill text-bg-primary" onChange={handleModeSelect} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">CashBack</option>
        </select>
        <hr></hr>
        {atmMode != "" && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={!validTransaction}></ATMDeposit>}
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  