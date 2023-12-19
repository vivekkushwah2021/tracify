import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  @HttpCode(200)
  registerUser(@Body() data){
    console.log(data)
    return this.appService.registerUser(data)
  }


  @Post('/addBook')
  @HttpCode(200)
  addBook(@Body() data){
    console.log(data)
   return this.appService.addBook(data)
  }

  @Post('/registerBookUser')
  registerBookUser(@Body() data){
    console.log(data)
    return this.appService.registerBookUser(data)
  }

  @Post('/addMonthlySubs')
  addMonthlySubscription(@Body() data){
    return this.appService.addMonthlySubscription(data)
  }

  @Post('/addPayment')
  addPayment(@Body() data){
    return this.appService.addPayment(data)
  }

  @Get('/users')
  getAllUsers(){
   try {
    return this.appService.getAllUsers()
   } catch (error) {
    console.log(error)
    throw error
   }
  }

  @Get('/books')
  getAllBooks(){
   try {
    return this.appService.getAllBooks()
   } catch (error) {
    console.log(error)
    throw error
   }
  }


}
