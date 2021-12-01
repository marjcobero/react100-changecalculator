import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    // the data we start with
    this.state = {
      amountDue: '',
      amountReceived: '',
      changeDue: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      oweMoney: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.name] : event.target.value 
    });
  }

  // our logic
  handleSubmit(event) {
    event.preventDefault();
    const { amountDue, amountReceived } = this.state;
    const changeDue = amountReceived - amountDue;
    if (Math.sign(changeDue) == -1) {
      this.setState({
        oweMoney: true,
      })
    } else {
    
      let convertedChange = {
        changeDue: 0,
        twenties:  0,
        tens:      0,
        fives:     0,
        ones:      0,
        quarters:  0,
        dimes:     0,
        nickels:   0,
        pennies:   0,
        oweMoney: false,
      }

      convertedChange.changeDue = changeDue;

      let dollars = Math.trunc(changeDue);
      convertedChange.twenties = Math.floor(dollars / 20);
      dollars = dollars % 20;
      convertedChange.tens = Math.floor(dollars / 10);
      dollars = dollars % 10;
      convertedChange.fives = Math.floor(dollars / 5);
      dollars = dollars % 5;
      convertedChange.ones = Math.floor(dollars);

      let cents = (changeDue % 1).toPrecision(2);
      cents = parseFloat(cents * 100);
      convertedChange.quarters = Math.floor(cents / 25);
      cents = cents % 25;
      convertedChange.dimes = Math.floor(cents / 10);
      cents = cents % 10;
      convertedChange.nickels = Math.floor(cents / 5);
      cents = cents % 5;
      convertedChange.pennies = Math.floor(cents);
      
      this.setState(convertedChange);
    }
  }

  render() {
    // output 
    let alertOwe = <div className="alert alert-danger" role="alert">
        Additional money owed.
      </div>
    let alertChange = <div className="alert alert-success" role="alert">
        The total change due is ${ this.state.changeDue }
      </div>

    // our front end
    return (
      
      /* title */
      <div>
      <div className="container mt-4">
        <h1 className="text-light">Change Calculator</h1>
      </div>
        
        <div className="row">
          <div className="col-4">
            <div className="card">

              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="amountDue">How much is due for the sale?</label>
                    <input type="text" value={ this.state.amountDue } onChange={ this.handleChange } className="form-control" name="amountDue"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="amountReceived">How much has the customer given you?</label>
                    <input type="text" value={ this.state.amountReceived } onChange={ this.handleChange } className="form-control" name="amountReceived"
                    />
                  </div>
                </form>
              </div>

              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={ this.handleSubmit }>
                  Calculate
                </button>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="card text-center">
              <div className="card-body">{ this.state.oweMoney ? alertOwe : alertChange }

                <div className="row">
                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light">
                        <h4 className="card-title">Twenties</h4>
                        <p className="card-text change">{ this.state.twenties }</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light">
                        <h4 className="card-title">Tens</h4>
                        <p className="card-text change">{ this.state.tens }</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light">
                        <h4 className="card-title">Fives</h4>
                        <p className="card-text change">{ this.state.fives }</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light">
                        <h4 className="card-title">Ones</h4>
                        <p className="card-text change">{ this.state.ones }</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body"></div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light">
                        <h4 className="card-title">Quarters</h4>
                        <p className="card-text change">{ this.state.quarters }</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light">
                        <h4 className="card-title">Dimes</h4>
                        <p className="card-text change">{ this.state.dimes }</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light">
                        <h4 className="card-title">Nickels</h4>
                        <p className="card-text change">{ this.state.nickels }</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light">
                        <h4 className="card-title">Pennies</h4>
                        <p className="card-text change">{ this.state.pennies }</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;