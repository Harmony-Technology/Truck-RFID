import { ForbiddenException, Injectable,ExecutionContext } from '@nestjs/common';
import { AddMatDto, OutputMatDto, AddTagDto, OutputTagDto, CreateInputDto, UserDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class InputsService {
  constructor(private prisma:PrismaService) {
  }
  create(createInputDto: CreateInputDto) {

    return 'This action adds a new input';
  }
  async addTag(tagDto: AddTagDto) {
    const serchMatwithouttag = await this.prisma.input_tag.findFirst({
      where: {
        tag: null,
      },
      orderBy :{
        created_at : "asc"
      }
    }) 
    if(serchMatwithouttag){
      const updateTag = await this.prisma.input_tag.update({
        where: {
          id: serchMatwithouttag.id,
        },
        data:{
          tag: tagDto.tag
        }
      })
      return updateTag;
    }
    else{
      const tag = await this.prisma.input_tag.create({
        data:{
          tag :  tagDto.tag,
        }
      
      }) 
      return 'This action adds a new tag without matricule';
    }
    
    
  }
  async addMat(addMatDto: AddMatDto) {
   const serchTagwithoutMat = await this.prisma.input_tag.findFirst({
      where: {
        plate_number: null,
      },
      orderBy :{
        created_at : "asc"
      }
    }) 
    if(serchTagwithoutMat){
      const updateMat = await this.prisma.input_tag.update({
        where: {
          id: serchTagwithoutMat.id,
        },
        data:{
          plate_number: addMatDto.matricule,
          image_url : addMatDto.image_url,
        }
        
      })
      return updateMat
    }
    else{
    const mat = await this.prisma.input_tag.create({
      data:{
        plate_number: addMatDto.matricule,
        image_url : addMatDto.image_url,
        in_time: new Date()
      }
    })
    return 'This action adds a new input mat';
  }
  }
  async paginate(page: number = 1, limit: number = 10) {
    const trucks = await this.prisma.input_tag.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalTrucks = await this.prisma.input_tag.count();
    const totalInput = await this.prisma.input_tag.count();

    const totalOutput = await this.prisma.input_tag.count({
      where : {
        statut:'checked'
      }
    });
    return { items: trucks, totalItems: totalTrucks, total_input: totalInput, total_output: totalOutput  };
  }

  async findAll() {
    const all = await this.prisma.input_tag.findMany()
    return all ;
  }

  findOne(id: number) {
    return `This action returns a #${id} input`;
  }

  update(id: number, updateInputDto: UpdateInputDto) {
    return `This action updates a #${id} input`;
  }

  remove(id: number) {
    return `This action removes a #${id} input`;
  }

  async checkTag(outputTagDto: OutputTagDto) {
    const tag = await this.prisma.input_tag.findFirst({
      where: {
        statut:'unchecked',
        tag: outputTagDto.tag
      },
      orderBy: {
        created_at:'asc'
      }
    })
    let result;
    if(tag){
    await this.prisma.input_tag.update({
      where : {
        id: tag.id
      }, 
      data:{
        tag_checked: true
      }
    })
    result = await this.updateStatus(tag.id);
  }
    return result ?? tag;
  }
  
  async checkMat(outputMatDto: OutputMatDto) {
    const mat = await this.prisma.input_tag.findFirst({
      where: {
        statut:'unchecked',
        plate_number: outputMatDto.matricule,
      },
      orderBy: {
        created_at:'desc'
      }
    })
    let result;
    if(mat){
      await this.prisma.input_tag.update({
        where : {
          id: mat.id
        }, 
        data:{
          mat_checked: true
        }
      })
      result = await this.updateStatus(mat.id);
    }
    return result ?? mat;
  }


  async updateStatus(id: number){
    const record = await this.prisma.input_tag.findUnique({
      where: {
        id: id,
      },
    })

    if (record?.tag_checked && record?.mat_checked){
      const updatedRecord = await this.prisma.input_tag.update({
        where: {
          id: id,
        },
        data: {
          out_time: new Date(),
          statut: 'checked'
        }
      });
     
      const user_id = 5
      const newNotif = await this.prisma.notifications.create({
        data:{
          message: 'this truck checked thas has this information'+ ' plate number '+updatedRecord.plate_number+ ' tag '+updatedRecord.tag, 
          user_id:user_id,

        }
      })
     
      return { message: 'Status changed to checked', updatedRecord };
    }
    return { message: 'Status remains unchecked', record };
  }
async updateUser(users : UserDto, id: number){
  const checkuser= await this.prisma.users.findUnique({
    where:{
      user_id: id
    }
  })
  if(!checkuser) throw new ForbiddenException("user not found")
  const user = await this.prisma.users.update({
    where: {
      user_id: id,
    },
    data: {
      phone: users.phone,
      email: users.email,
      first_name:users.first_name,
      last_name:users.first_name,
    }
  })
  return 'user modify'
}
async findAllNotif(){
  const allNotif= await this.prisma.notifications.findMany({})
  const countNotif = await this.prisma.notifications.count({
    where: {
      is_read : false
    },
  })
  return {notfication : allNotif, countNotif} 
}
async updateRead(){
  const notifications = await this.prisma.notifications.findMany({
    where: {
      is_read : false
    }
  });

  if (notifications && notifications.length > 0) {
    const updated = await this.prisma.notifications.updateMany({
      where: {
        is_read: false
      },
      data: {
        is_read: true
      }
    });
  }
}

}
