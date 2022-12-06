import { Injectable } from '@nestjs/common';

import { SCD30 } from 'scd30-node';
import sensor from 'ds18b20-raspi';

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
  getTemperature(): string {
    sensor.readAllC((err, temps) => {
      if (err) {
        return err;
      } else {
        return temps;
      }
    });
  }
}
