'use strict';

module.exports = (sequelize, DataTypes) => {

  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 3,
          msg: 'O campo nome deve conter 3 ou mais caracteres'
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dados informados no e-mail são inválidos'
        }
      }
    },
    role: DataTypes.STRING
  }, { 
    paranoid: true,
    defaultScope: {
      where: { ativo: true }
    },
    scopes: {
      todos: { where: {} }
    }
  });
  
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    })
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      scope: {
        status: 'confirmado'
      },
      as: 'matriculasConfirmadas'
    })
  };

  return Pessoas;
  
};