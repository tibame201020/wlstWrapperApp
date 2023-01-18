import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  ServerConfig,
  DeployConfig,
  ServerJdbc,
  ServerDeploy,
  DatasourceConfig,
} from '../model';
import { WlstService } from '../wlst.service';

@Component({
  selector: 'app-jdbc',
  templateUrl: './jdbc.component.html',
  styleUrls: ['./jdbc.component.css'],
})
export class JdbcComponent implements OnInit {
  serverConfig!: ServerConfig;
  jdbcConfigs: DatasourceConfig[] = [];
  constructor(private wlstService: WlstService) {}

  ngOnInit(): void {
    this.getLocalData();
  }

  getLocalData() {
    this.wlstService.getServerJdbc().subscribe((res) => {
      this.serverConfig = res.serverConfig;
      this.jdbcConfigs = res.jdbcConfigs;
    });
  }

  modify() {
    Swal.fire({
      title: 'Server Config',
      html:
        '<input id="url" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.adminURL +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="user" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.adminUsername +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="pwd" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.adminPassword +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="setDomainEnv" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.setDomainEnv +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="execWlst" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        this.serverConfig.execWlst +
        '">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          let urlDom = document.getElementById('url') as HTMLInputElement;
          let userDom = document.getElementById('user') as HTMLInputElement;
          let pwdDom = document.getElementById('pwd') as HTMLInputElement;
          let setDomainEnvDom = document.getElementById(
            'setDomainEnv'
          ) as HTMLInputElement;
          let execWlstDom = document.getElementById(
            'execWlst'
          ) as HTMLInputElement;
          if (urlDom && userDom) {
            resolve([
              urlDom.value,
              userDom.value,
              pwdDom.value,
              setDomainEnvDom.value,
              execWlstDom.value,
            ]);
          }
        });
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          this.changeServerConfig(result.value);
        } else {
          Swal.fire({
            icon: 'error',
            text: '格式錯誤',
          });
        }
      }
    });
  }

  changeServerConfig(value: any) {
    this.serverConfig.adminURL = value[0];
    this.serverConfig.adminUsername = value[1];
    this.serverConfig.adminPassword = value[2];
    this.serverConfig.setDomainEnv = value[3];
    this.serverConfig.execWlst = value[4];
  }

  updateJdbc(idx: number) {
    let jdbcConfig = this.jdbcConfigs[idx];
    Swal.fire({
      title: 'Jdbc Config',
      html:
        '<input id="name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.name +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="jndiName" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.jndiName +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="dsURL" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.dsURL +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="user" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.user +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.password +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="target" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.target +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="driverClass" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.driverClass +
        '">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          let name = document.getElementById('name') as HTMLInputElement;
          let jndiName = document.getElementById(
            'jndiName'
          ) as HTMLInputElement;
          let dsURL = document.getElementById('dsURL') as HTMLInputElement;
          let user = document.getElementById('user') as HTMLInputElement;
          let password = document.getElementById(
            'password'
          ) as HTMLInputElement;
          let target = document.getElementById('target') as HTMLInputElement;
          let driverClass = document.getElementById(
            'driverClass'
          ) as HTMLInputElement;

          if (name && dsURL && user) {
            resolve([
              name.value,
              jndiName.value,
              user.value,
              password.value,
              target.value,
              driverClass.value,
              dsURL.value,
            ]);
          }
        });
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          this.jdbcConfigs[idx] = this.getJdbcConfig(result.value);
        } else {
          Swal.fire({
            icon: 'error',
            text: '格式錯誤',
          });
        }
      }
    });
  }

  addJdbc() {
    Swal.fire({
      title: 'Jdbc Config',
      html:
        '<input id="name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'name' +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="jndiName" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'jndiName' +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="dsURL" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'dsURL' +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="user" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'user' +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'password' +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="target" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'target' +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="driverClass" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        'driverClass' +
        '">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          let name = document.getElementById('name') as HTMLInputElement;
          let jndiName = document.getElementById(
            'jndiName'
          ) as HTMLInputElement;
          let dsURL = document.getElementById('dsURL') as HTMLInputElement;
          let user = document.getElementById('user') as HTMLInputElement;
          let password = document.getElementById(
            'password'
          ) as HTMLInputElement;
          let target = document.getElementById('target') as HTMLInputElement;
          let driverClass = document.getElementById(
            'driverClass'
          ) as HTMLInputElement;

          if (name && dsURL && user) {
            resolve([
              name.value,
              jndiName.value,
              user.value,
              password.value,
              target.value,
              driverClass.value,
              dsURL.value,
            ]);
          }
        });
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          this.jdbcConfigs = [this.getJdbcConfig(result.value)].concat(
            this.jdbcConfigs
          );
        } else {
          Swal.fire({
            icon: 'error',
            text: '格式錯誤',
          });
        }
      }
    });
  }

  getJdbcConfig(value: any) {
    return {
      name: value[0],
      jndiName: value[1],
      user: value[2],
      password: value[3],
      target: value[4],
      driverClass: value[5],
      dsURL: value[6],
    };
  }

  deleteJdbc(idx: number) {
    this.jdbcConfigs.splice(idx, 1);
  }
}
