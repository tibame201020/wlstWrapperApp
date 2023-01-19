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
  isInsertMode: boolean = true;
  loadStatus: boolean = false;

  constructor(private wlstService: WlstService) { }

  ngOnInit(): void {
    this.getLocalData();
  }

  execConfirm() {
    if (!this.jdbcConfigs.length) {
      Swal.fire({
        icon: 'error',
        text: '並無配置JDBC項目',
        timer: 1200,
      });
      return;
    }

    let msg;
    if (this.isInsertMode) {
      msg = '確認新增jndi至weblogic?';
    } else {
      msg = '確認更新jndi密碼?';
    }

    Swal.fire({
      title: msg,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        this.exec();
      }
    });
  }

  exec() {
    this.loadStatus = true;
    let serverJdbc: ServerJdbc = {
      serverConfig: this.serverConfig,
      jdbcConfigs: this.jdbcConfigs,
      insertMode: this.isInsertMode,
    };
    console.log(serverJdbc);
    this.wlstService.exePython(serverJdbc).subscribe((res) => {
      this.loadStatus = false;
      if (res) {
        Swal.fire({
          icon: 'info',
          title: '請等候terminal執行完畢',
          showConfirmButton: true,
          timer: 2500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: '請確認config參數無誤',
        });
      }
    });
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
      html: this.getSweetAlertHtml(jdbcConfig),
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

  getSweetAlertHtml(jdbcConfig?: any) {
    if (!jdbcConfig) {
      jdbcConfig = {
        name: '',
        jndiName: '',
        dsURL: '',
        user: '',
        password: '',
        target: '',
        driverClass: '',
      };
    }
    let html;
    if (this.isInsertMode) {
      html =
        '<input id="name" placeholder="Jdbc Name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.name +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="jndiName" placeholder="Jndi Name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.jndiName +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="dsURL" placeholder="Database Url" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.dsURL +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="user" class="form-control" placeholder="User Account" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.user +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="password" placeholder="User Password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.password +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="target" class="form-control" placeholder="Target Servers" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.target +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="driverClass" placeholder="Driver Class" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.driverClass +
        '">';
    } else {
      html =
        '<input id="name" placeholder="Jdbc Name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.name +
        '">' +
        '<input type="hidden" placeholder="Jndi Name" id="jndiName" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.jndiName +
        '">' +
        '<input type="hidden" id="dsURL" placeholder="Database Url" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.dsURL +
        '">' +
        '<input type="hidden" placeholder="User Account" id="user" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.user +
        '">' +
        '<br>' +
        '<br>' +
        '<input id="password" placeholder="User Password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.password +
        '">' +
        '<input type="hidden" placeholder="Target Servers" id="target" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.target +
        '">' +
        '<input type="hidden" id="driverClass" placeholder="Driver Class" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="' +
        jdbcConfig.driverClass +
        '">';
    }

    return html;
  }

  copyJdbc(idx: number) {
    let jdbcConfig = this.jdbcConfigs[idx];
    Swal.fire({
      title: 'Jdbc Config',
      html: this.getSweetAlertHtml(jdbcConfig),
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

  addJdbc() {
    Swal.fire({
      title: 'Jdbc Config',
      html: this.getSweetAlertHtml(),
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
