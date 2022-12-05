import { Injectable } from '@nestjs/common';
const {SCD30} = require('scd30-node');
const sensor = require('ds18b20-raspi');



sensor.readAllC((err, temps) => {
	if (err) {
		console.log(err);
	} else {
		console.log(temps);
	}
});


(async () => {
  const scd30 = await SCD30.connect();
  await scd30.startContinuousMeasurement();
 
  const measurement = await scd30.readMeasurement();
  console.log(`CO2 Concentration: ${measurement.co2Concentration} ppm`);
  console.log(`Temperature: ${measurement.temperature} °C`);
  console.log(`Humidity: ${measurement.relativeHumidity} %`);
 
  await scd30.disconnect();
})();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
