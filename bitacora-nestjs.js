// PASOS PROYECTO NESTJS: 
//* INSTALACION GLOBAL:   
//  npm i -g @nestjs/cli
//* CREAR PROYECTO DENTRO DE UNA CARPERTA:    
// nest new proyect-name  
//* levantar servidor por cada cambio
// seguir los pasos cd..  / npm run start | npm run start:dev :
//* errores de slint por conflicto de estilos de finalizacion de linea usados por diferentes sistemas operaTivos,
//  para lo cual se configura: 
// 1.- ( archivo   .eslintrc.js  : "rules": {"prettier/prettier": ["error", { "endOfLine": "lf" }] 
//* 2.- 'plugin:prettier/recommended', : al comentar esta linea en .eslintrs.js te deja de retar por las lineas de finalizacion CRLF/LF
// 3.-  archivo   .prettierrc  :  "endOfLine": "lf"
// 4.- crear carpeta .vscode y archivo 'settings.json' : {  "files.eol":"\n"}  comando : npx prettier --write . || o cambiar por cada archivo de CRLF  a LF)
//* crear module/service/controller de cada entidad con decoradores @Module( ) | @Controller( )|@Injectable( )
//* unificar .gitignore en back/
// verificar que esta en la misma rama 'main' o moverla
// Eliminar el repositorio Git dentro de ecommerce-anibau : 'rm -rf .git'
// ubicarse y pushear
//* nest g service users: comando que crea un archivo de servicio de 'users'
//* nest g resource <name> : comando nestjs que crea carpeta completa
//* crear globalMiddleware: export function globalM(req:Request, res:Response, next: NextFuntion){ req.method:  accede al metodo de la peticion, req.url : accede a la ruta de la peticion}
//* globalMiddleware en main.ts: app.use(globalMiddleware)
//* @Module({}) ,  @Controller('ruta') , @Injectable()
//* constructor(private readonly userFunction: UserFunction){ } : inyeccion de dependencia basica como repositorios declaramos con un nombre interno a la funcion importada
// @Get('ruta' ) | @Post(':id' ) | @Put( ) | @Delete( ) : peticiones http usados en 'controller'
// @httpCode(numberError) : decorador para codigo de error en peticion
// @Param('id') id: string : decorador de parametro(dato especifico en url) en el  @Controller(':id') se especifica ':' parametro
//  @Query( ) page: string : dato no especifico de url que se reconoce como todo luego de ? con su clave-valor: /user?age=2
// @Body( ) request: Request : extrae dato del body con tipo de dato Request de Express
//* funcion validates DTO's en UTILS: export function validate (data){}, en controller inicializar funcion
//*  CONEXION A BASE DE DATOS en carpeta de proyecto:
//* npm install  @nestjs/typeorm @nestjs/config typeorm pg  
//* npm i dotenv
//* crear un archivo typeorm.config.ts: const config:DataSourceOptions={.env: type, host, port, database, username, password, synchonize, dropschema, entities, logging}
//* configurar en app.module: para que variables sean accesivbles en todo en proyecto: imports:[configModule.forRoot({isGlobal:true, load:[typeormConfig /*archivo*/]})]
//* configurar en app.module: configuracion de basedatos: TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     configService.get('typeorm'),
    // })
//* npm i uuid
//* crear entidades @Entity() @PrimaryGeneratedColumn('uuid) @Column({type:'varchar', length, nullable, unique})
//* relaciones typeorm: @OnetoOne()/ @joincolumn(), @manytoone()/@onetomany(), @manytomany()/ @jointable(), {cascade:true}
//* inyeccion de repositories: constructor(@InjectRepository(User) private userRepository: Repository<User>){}
//* imports:[TypeOrmModule.forFeature([User])], en repositories.module
//* adaptar funciones con metodos: .create, .find, .finone, .save,etc



// decorador @Inject( 'name') private nameInternal :inyeccion de dependencia  con un 'provide' personalizado
// { provide: functionReplace||nameProvide, useValue: functiongetUser }:para providers externos
// { provide: 'nameProvider', useFactory: ( )=>{ },}:  creamos el provide personalizado dentro de 'provider'
// ...implements NestMiddleware: metodo nestjs para crear middleware
// @useGuard(guard) : decorador para implementar un guardia en controller
// @useInterceptor(interceptor) 



