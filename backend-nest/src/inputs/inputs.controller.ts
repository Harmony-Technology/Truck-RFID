import { Controller, Get, Post, Put,Body, Patch, Param, Delete,ParseIntPipe, Query } from '@nestjs/common';
import { InputsService } from './inputs.service';
import { AddMatDto, OutputMatDto, AddTagDto, OutputTagDto, CreateInputDto, UserDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';

@Controller('inputs')
export class InputsController {
  constructor(private readonly inputsService: InputsService) {}

  @Post("/tag")
  createTag(@Body() createInputDto: AddTagDto) {
    return this.inputsService.addTag(createInputDto);
  }
  
  @Post("/matricule")
  createMat(@Body() createInputDto: AddMatDto) {
    return this.inputsService.addMat(createInputDto);
  }
  @Get()
  async getUsers(
    @Query('page', ParseIntPipe) page: number = 1,
    limit : number = 5
  ) {
    const pagination = await this.inputsService.paginate(page, limit);
    return {
      data: pagination.items,
      truck_count: pagination.totalItems,
      currentPage: page,
      perPage: limit,
      input_count: pagination.total_input,
      output_count: pagination.total_output
    };
  }

  @Post("/check/tag")
  checkTag(@Body() outputTagDto: OutputTagDto) {
    return this.inputsService.checkTag(outputTagDto);
  }
  
  @Post("/check/mat")
  checkMat(@Body() outputMatDto: OutputMatDto) {
    return this.inputsService.checkMat(outputMatDto);
  }
  @Put('/updateUser/:id')
  updateUser(@Body() userDto: UserDto, @Param('id') id: string ) {
    const userId = Number(id);
    return this.inputsService.updateUser(userDto, userId);
  }
  @Get("findAll")
  findAll() {
    return this.inputsService.findAll();
  }
  @Get("notification/findAll")
  findAllnotif() {
    return this.inputsService.findAllNotif();
  }
  @Put('notification/mark-as-read')
  updateRead(){
    return this.inputsService.updateRead();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inputsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInputDto: UpdateInputDto) {
    return this.inputsService.update(+id, updateInputDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inputsService.remove(+id);
  }
}


