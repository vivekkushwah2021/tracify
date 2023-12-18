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
    let output = await this.prisma.bookUser.create({
      data: userData
    })
    return output
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

    let userID = output.map((x => x.id))

    let temp = await this.prisma.monthlySubsription.findMany({
      select: { book: true, userID: true },
      where: { userID: { in: userID } }
    })

    for (let i = 0; i < output.length; i++) {
      let mIndex = temp.filter((x => x.userID == output[i].id))
      if (mIndex.length > 0) {
        let newData = mIndex.map((x => x.book))
        
        //* filter unique books and assign it to book key
        output[i]['books'] = newData.filter((value, index, self) =>
        self.findIndex(v => v.id === value.id) === index
      )
      }
    }

    console.log(temp)

    return output
  }

  async getAllBooks(){
    return await this.prisma.book.findMany({
     
    })
  }

}
