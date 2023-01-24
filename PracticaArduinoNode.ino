int counter = 0;
void setup() {
  Serial.begin(9600);
  
}

void loop() {
  Serial.println(counter, DEC);
  counter = counter + 5;
  delay(2000);
}
