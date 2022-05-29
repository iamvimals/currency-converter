import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from '../../currency.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('currencyForm') currencyForm: any;
  outputAmount: any;
  currencies: Currency[] = [];
  defaultFromCurrency: string = 'INR';
  defaultToCurrency: string = 'USD';
  constructor(private currencyService: CurrencyService) {
    this.fetchCurrencies()
  }

  ngOnInit(): void {
    
  }

  fetchCurrencies() {
    console.log('Fetching Currencies')

      this.currencyService.fetchCurrencySymbols().subscribe((response: any) => {
        console.log('Fetched Currencies')
        if(response?.symbols) {
          for(const key of Object.keys(response.symbols)) {
            this.currencies.push({ symbol: key})
          }
        }
      }, (error) => {
        alert('Error fetching currencies')
      }
      )

  }

  onSubmit() {
    console.log('Conversion in Progress')
    this.currencyService
      .convertCurrency(this.currencyForm.form.value)
      .subscribe((response: any) => {
        console.log('Conversion Completed')
        this.outputAmount = response?.result.toFixed(2);

      }, (error) => {
        alert('Enter a valid input')
      });
  }

  // onInputChange(inp: any) {
  //   console.log(inp)
  // }
}
