#Criar um novo database
create database db_controle_filmes_ab;

#Ativa o database a ser utilizado
use db_controle_filmes_ab;

#Criação da tabela de filme
create table tbl_filme (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    duracao time not null,
    sinopse text not null,
    data_lancamento date not null,
    foto_capa varchar(200),
    link_trailer varchar(200)
);

show tables;

desc tbl_filme;

select * from tbl_filme;

#Criar tabela relacionamento pelo MySQL

create table tbl_filme_genero(
    id        int not null primary key auto_increment,
    id_filme  int not null,
    id_genero int not null,

constraint FK_CLASSIFICACAO_FILME #Cira um nome para o relacionamento #FK com _ORIGEM e _DESTINO
foreign key(id_classificacao) #destino
references tbl_classificacao(id) #origem

constraint FK_GENERO_FILME_GENERO #Cira um nome para o relacionamento #FK com _ORIGEM e _DESTINO
foreign key(id_genero) #destino
references tbl_genero(id) #origem

constraint FK_FILME_FILME_GENERO #Cira um nome para o relacionamento #FK com _ORIGEM e _DESTINO
foreign key(id_filme) #destino
references tbl_filme(id) #origem
)

#deletar os filmes por id
delete from tbl_filme where id = 7;

#Adiciona um atributo(coluna) à uma tabela
alter table tbl_filme add column id_classificacao int not null;

#Torna o atributo uma chave estrangeira
alter table tbl_filme add constraint FK_CLASSIFICACAO_FILME foreign key (id_classificacao) references tbl_classificacao(id);