import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) {

  }

  getHello(): string {
    return 'Hello World!';
  }

  async addBook(bookData) {
    let output = await this.prisma.book.create({
      data: {
        title: bookData.title,
        price: bookData.price,
        year: bookData.year
      }
    })
    return output
  }

  async addBookUser(bookData) {
    let output = await this.prisma.book.create({
      data: {
        title: bookData.title,
        price: bookData.price,
        year: bookData.year,

      }
    })
    return output
  }

  async registerUser(userData) {
    let output = await this.prisma.adminUser.create({
      data: userData
    })
    return output
  }

  async registerBookUser(userData) {

    if (userData.bookPayment != undefined) {
      let payment = userData.bookPayment
      delete userData.bookPayment
      let output = await this.prisma.bookUser.create({
        data: userData
      })

      for (let i = 0; i < payment.length; i++) {
        let obj = {
          userID:output.id,
          bookID:payment[i]
      }
        await this.addPayment(obj)
      }

      return output
    } else {
      let output = await this.prisma.bookUser.create({
        data: userData
      })
      return output
    }
  }

  async addMonthlySubscription(userData) {
    let output = await this.prisma.monthlySubsription.create({
      data: {
        month: userData.month,
        year: userData.year,
        bookUser: {
          connect: {
            id: userData.userID
          }
        },
        book: {
          connect: {
            id: userData.bookID
          }
        }
      }
    })
    return output
  }

  async addPayment(paymentData) {
    let output = await this.prisma.payment.create({
      data: {
        bookUser: {
          connect: {
            id: paymentData.userID
          }
        },
        book: {
          connect: {
            id: paymentData.bookID
          }
        },
        isPaid: 1
      }
    })
    return output
  }


  async getAllUsers() {


    let output = await this.prisma.bookUser.findMany({
      include: {
        payment: true, monthlySubscription: true
      },
    })

    return output
  }

  async getAllBooks() {
    return await this.prisma.book.findMany({

    })
  }

  async getPayment(){
    return await this.prisma.payment.findMany({
      include:{
        bookUser:true,book:true
      }
    })
  }

}
