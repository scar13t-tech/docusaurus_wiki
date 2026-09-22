---
sidebar_position: 2
title: Prowlarr
description: Install Prowlarr on TrueNAS, Proxmox, Unraid, or Docker with Dockge, then connect your indexers and applications.
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<style>{`
  .prowlarr-title-logo {
    width: 44px;
    height: 44px;
    margin-right: 0.5rem;
    vertical-align: middle;
    object-fit: contain;
  }

  .prowlarr-install-section {
    margin: 1.5rem 0 2rem;
    padding: clamp(1rem, 3vw, 1.5rem);
    border: 1px solid var(--ifm-color-emphasis-300);
    border-top: 4px solid var(--ifm-color-primary);
    border-radius: 0.75rem;
    background: var(--ifm-background-surface-color);
  }

  .prowlarr-install-section > h2 {
    margin-top: 0;
  }

  .prowlarr-install-section .tabs {
    gap: 0.5rem;
    flex-wrap: wrap;
    overflow: visible;
  }

  .prowlarr-install-section .tabs__item {
    flex: 1 1 8rem;
    justify-content: center;
    padding: 0.75rem 1rem;
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: 0.5rem;
  }

  .prowlarr-install-section .tabs__item--active {
    border-color: var(--ifm-color-primary);
    background: var(--ifm-color-emphasis-100);
    box-shadow: inset 0 -3px 0 var(--ifm-color-primary);
  }

  .prowlarr-install-panel {
    padding: clamp(1rem, 3vw, 1.5rem);
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: 0.5rem;
    background: var(--ifm-background-color);
  }

  .prowlarr-install-panel > :first-child {
    margin-top: 0;
  }

  .prowlarr-install-panel > :last-child {
    margin-bottom: 0;
  }
`}</style>

# <img className="prowlarr-title-logo" src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/prowlarr.svg" alt="" width="44" height="44" /> Prowlarr

[Prowlarr](https://prowlarr.com/) manages your torrent trackers and Usenet indexers in one place. It can sync those indexers to applications such as Sonarr and Radarr, so you can maintain their connection settings centrally.

An **indexer** is a service your applications search for available releases. Prowlarr connects to those services and passes search results to your applications. Your download client, such as qBittorrent or SABnzbd, handles the actual download.

This guide covers four installation methods, followed by a shared setup walkthrough.

<section className="prowlarr-install-section" aria-labelledby="choose-your-platform">

## Choose your platform

Select the platform where you want to install Prowlarr. You only need to follow **one installation method**.

Each tab links to its maintained installation source. Use those pages for the current requirements, installer commands, templates, and Compose examples.

> **Which address should I use?**
>
> - **Proxmox:** use the Prowlarr LXC container's IP address and the web port shown by the installer.
> - **TrueNAS, Unraid, or Docker:** normally use the host's IP address and the published web port. The host is the system running Prowlarr; the published port is the port it exposes for access.
>
> Use the port shown during installation. It may differ from `9696`.

<Tabs groupId="prowlarr-install-method" queryString="install" defaultValue="truenas">
<TabItem
  value="truenas"
  label={
    <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
      <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/truenas.svg" alt="" width="22" height="22" style={{objectFit: 'contain', flexShrink: 0}} />
      TrueNAS
    </span>
  }
>

<div className="prowlarr-install-panel">

### Install through TrueNAS Apps

Use the **Prowlarr** entry in the TrueNAS **Community** catalog. This method applies to TrueNAS releases with the current Docker-based Apps system. Check the listing for its minimum supported TrueNAS version.

**Sources:** [Prowlarr app listing](https://apps.truenas.com/catalog/prowlarr_community/) · [TrueNAS Apps initial setup](https://apps.truenas.com/getting-started/initial-setup/) · [Installing TrueNAS apps](https://apps.truenas.com/managing-apps/installing-apps/)

1. Open **Apps** in TrueNAS. If prompted, choose the pool that will hold your applications.
2. Under the `wall` pool's `appdata` dataset, create a `prowlarr` child dataset. Its path will be `/mnt/wall/appdata/prowlarr`. Use the **Generic** preset for POSIX permissions.
3. Open **Discover Apps**, search for **Prowlarr**, select its listing, and click **Install**. If it is missing, check that the **Community** train is enabled in the Apps settings and refresh the catalog.
4. Review these settings:

| Setting | What to use |
| --- | --- |
| Application name | `prowlarr`, or another unique name. |
| Timezone | Your local timezone. |
| User ID and Group ID | IDs that have access to the configuration dataset. Check the values shown by this app. |
| Prowlarr Config Storage | **Host Path**, pointing to `/mnt/wall/appdata/prowlarr`. |
| WebUI Port | An available published port. Record the value shown in the form. |
| Host Network | Leave disabled for this installation. |

For a dataset managed with **POSIX permissions**, give the app's user or group read, write, and directory traversal permissions. Parent directories must also allow traversal. Leave **Enable ACL** off when permissions are already managed through POSIX. See [TrueNAS permissions](https://www.truenas.com/docs/scale/datasets/permissions/configuringacls/) for the dataset controls.

5. Click **Install** and wait for the app to show **Running**.
6. Open its **Web UI** button, or browse to `http://TRUENAS-IP:WEBUI-PORT`, replacing both placeholders.

The published TrueNAS port can differ from `9696`. Use that published port when another application connects through the TrueNAS server's IP address.

**Expected result:** Prowlarr is running and its web interface opens in your browser.

</div>

</TabItem>
<TabItem
  value="proxmox"
  label={
    <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
      <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/proxmox.svg" alt="" width="22" height="22" style={{objectFit: 'contain', flexShrink: 0}} />
      Proxmox
    </span>
  }
>

<div className="prowlarr-install-panel">

### Install with Proxmox Community Scripts

The community-maintained Prowlarr script creates an LXC container and installs Prowlarr inside it. The project is separate from Proxmox's official software support.

**Sources:** [Prowlarr Community Script](https://community-scripts.org/scripts/prowlarr) · [Community Scripts repository](https://github.com/community-scripts/ProxmoxVE)

1. Open the **Prowlarr Community Script** page linked above.
2. Read its current requirements, installation notes, and resource defaults. Select **Proxmox VE** as the host if the page offers multiple platforms.
3. Review the script, then copy the installation command directly from that page.
4. In the Proxmox web interface, select the **node** that will host Prowlarr and open its **Shell**.
5. Run the copied command in the **Proxmox node shell**.
6. Follow the installer prompts. Use its defaults for a straightforward installation, or its advanced options to select storage, networking, and resources.
7. When installation finishes, note the new container's IP address and open the displayed web address, normally `http://CONTAINER-IP:9696`.

Use the **LXC container's IP**, rather than the Proxmox host's IP, when connecting to this instance. Set a DHCP reservation or configure a static address so your application connections stay valid.

The maintained command remains on the source page, so you always obtain the version its authors currently provide.

**Expected result:** Prowlarr is running and its web interface opens in your browser.

</div>

</TabItem>
<TabItem
  value="unraid"
  label={
    <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
      <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/unraid.svg" alt="" width="22" height="22" style={{objectFit: 'contain', flexShrink: 0}} />
      Unraid
    </span>
  }
>

<div className="prowlarr-install-panel">

### Install through Unraid Apps

This walkthrough uses the **LinuxServer.io Prowlarr** template. Match the publisher when searching, because different templates can use different images and settings.

**Sources:** [Prowlarr in Community Apps](https://ca.unraid.net/apps/prowlarr-11beich0q7891h) · [Unraid container configuration](https://docs.unraid.net/unraid-os/using-unraid-to/run-docker-containers/managing-and-customizing-containers/) · [LinuxServer Prowlarr documentation](https://docs.linuxserver.io/images/docker-prowlarr/)

1. Confirm that Docker is enabled under **Settings → Docker**.
2. Open **Apps** and search for **Prowlarr**. If Apps is unavailable, follow the [Community Applications instructions](https://docs.unraid.net/community-applications/) first.
3. Select the **LinuxServer.io** entry and open its installation form.
4. Review the template:

| Setting | What to use |
| --- | --- |
| Network type | **Bridge** for this walkthrough. |
| WebUI port | An unused host port mapped to container port `9696`. |
| Appdata path | A persistent directory such as `/mnt/user/appdata/prowlarr`, mapped to `/config`. |
| PUID and PGID | Keep the template values if they match your appdata permissions. The current Unraid template uses `99` and `100`. |
| Timezone | Check the inherited timezone or set `TZ` if needed. |

5. Apply the template and wait for installation to finish.
6. On the **Docker** tab, enable **Autostart** for Prowlarr.
7. Click the Prowlarr icon and select **WebUI**, or open `http://UNRAID-IP:HOST-PORT`.

The appdata directory holds your settings and database. Keep that mapping consistent when updating or recreating the container.

**Expected result:** Prowlarr is running and its web interface opens in your browser.

</div>

</TabItem>
<TabItem
  value="dockge"
  label={
    <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
      <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/docker.svg" alt="" width="22" height="22" style={{objectFit: 'contain', flexShrink: 0}} />
      Docker
    </span>
  }
>

<div className="prowlarr-install-panel">

### Deploy a Compose stack in Dockge

Dockge manages Docker Compose stacks through a web interface. Have Docker and Dockge running on your chosen host before adding Prowlarr.

**Sources:** [Dockge installation and documentation](https://github.com/louislam/dockge#how-to-install) · [LinuxServer's maintained Prowlarr Compose example](https://docs.linuxserver.io/images/docker-prowlarr/#docker-compose-recommended-click-here-for-more-info) · [Understanding PUID and PGID](https://docs.linuxserver.io/general/understanding-puid-and-pgid/)

1. Open the LinuxServer Prowlarr documentation and copy its current **Docker Compose** example.
2. In Dockge, select **Compose** to create a stack and name it `prowlarr`.
3. Replace the sample editor contents with the complete upstream example.
4. Adapt these fields before deployment:

| Field | What to change |
| --- | --- |
| `image` | Use the image reference in LinuxServer's current example. Its `latest` tag tracks stable Prowlarr releases. |
| `PUID` and `PGID` | Use the numeric user and group IDs that own your configuration directory. |
| `TZ` | Set your timezone, for example `America/New_York`. |
| Volume ending in `:/config` | Use `/mnt/wall/appdata/prowlarr:/config`. The host directory must exist on the Docker host. |
| `ports` | Use an available host port. With `9696:9696`, the left number is the host port. |
| `restart` | Keep the restart policy provided by the example. |

The mapping `/mnt/wall/appdata/prowlarr:/config` stores Prowlarr's configuration under `/mnt/wall/appdata` on the **Docker host**. When Dockge runs on TrueNAS, use the `prowlarr` child dataset inside `wall/appdata`.

Create that directory or dataset first and grant the selected user and group access. An absolute path makes it clear where your data lives. Prowlarr's normal indexer-management setup only needs its configuration storage, without movie, TV, or download-directory mounts.

5. Select **Deploy** and wait for the stack to start. Check Dockge's logs if deployment fails.
6. Open `http://DOCKER-HOST-IP:HOST-PORT` in your browser.

Keep the Compose file and configuration directory in your backup plan. Dockge's own configuration storage is separate from Prowlarr's `/config` storage.

**Expected result:** Prowlarr is running and its web interface opens in your browser.

</div>

</TabItem>
</Tabs>

</section>

Once Prowlarr opens successfully, continue with the [initial setup below](#initial-setup).

## Initial setup

The following steps apply to **all four installation methods**.

### 1. Set up authentication

On first launch, complete Prowlarr's authentication prompt. You can review these settings later under **Settings → General → Security**.

1. Select **Forms (Login Page)** as the authentication method.
2. Set **Authentication Required** to **Enabled**.
3. Create a username and a strong password, then save.

**Expected result:** You can sign in with your new account and open Prowlarr.

Keep this management interface on your trusted network. Use a VPN for remote administration instead of directly forwarding its web port through your router.

Source: [Prowlarr authentication](https://wiki.servarr.com/prowlarr/faq#forced-authentication).

### 2. Add an indexer

1. Open **Indexers** and select **Add Indexer** or the **+** button.
2. Search for your provider and select its matching entry.
3. Enter the connection details it requests. These might include an API key, username and password, or a cookie supplied by your provider.
4. Leave the indexer enabled and start with the **Standard** sync profile.
5. Select **Test**. Resolve any reported error, then select **Save**.
6. Repeat for each indexer you use.

**Expected result:** The indexer's **Test** button shows a green check, and the saved indexer appears in your list.

If your provider is missing, **Generic Newznab** is for compatible Usenet services and **Generic Torznab** is for compatible torrent services. These require the corresponding API support from the provider; entering an ordinary website URL is insufficient.

Keep provider-specific options at their defaults unless the entry's instructions say otherwise. Respect any API or download limits associated with your account.

Source: [Prowlarr indexer configuration](https://wiki.servarr.com/prowlarr/indexers).

### 3. Connect Sonarr or Radarr

Make sure the application is already installed and accessible. In **Sonarr or Radarr**, open **Settings → General → Security** and copy that application's **API Key**.

> **Use the connected application's API key.** The key entered in Prowlarr must come from the application you are connecting. For example, a Sonarr connection uses **Sonarr's API key**.

Then, in **Prowlarr**:

1. Open **Settings → Apps** and select **+**.
2. Choose the application you are connecting.
3. Complete the connection fields:

| Field | What to enter |
| --- | --- |
| Name | A recognizable name, such as `Sonarr` or `Radarr`. |
| Sync Level | **Full Sync** to manage its Prowlarr indexers centrally. |
| Prowlarr Server | The Prowlarr URL reachable **from the application you are adding**. |
| Application Server | The Sonarr or Radarr URL reachable **from Prowlarr**. |
| API Key | The key copied from **Sonarr or Radarr**. |
| Tags | Leave blank for the initial setup. |

**Choosing the server addresses:** Start with each application's reachable IP address and published web port. For example, if Prowlarr is at `192.168.1.50:9696` and Sonarr is at `192.168.1.51:8989`:

| Field in Prowlarr's Sonarr connection | Example value |
| --- | --- |
| Prowlarr Server | `http://192.168.1.50:9696` |
| Sonarr Server | `http://192.168.1.51:8989` |

These are example addresses. Substitute your actual addresses and published ports, especially when using TrueNAS Apps.

Inside a container, `localhost` refers to that container. Use addresses the applications can reach from each other, even if both interfaces already open in your browser.

4. Select **Test**, then **Save** after it succeeds. Repeat for each application instance.

**Expected result:** The application connection test succeeds, and Sonarr or Radarr appears under **Settings → Apps**.

With **Full Sync**, manage Prowlarr's indexer settings in Prowlarr. It can overwrite changes you make to those settings inside Sonarr or Radarr.

<details>
<summary>Optional: use Docker service names</summary>

Two stacks created separately in Dockge do not automatically share a network or resolve each other's service names. Reachable host addresses and published ports are a straightforward starting point.

If the containers share a **user-defined Docker network**, you can use service names and internal ports, such as `http://prowlarr:9696`. The name must resolve from the application making the connection.

Source: [Docker Compose networking](https://docs.docker.com/compose/how-tos/networking/).

</details>

<details>
<summary>If you use a reverse proxy</summary>

Use a URL reachable from the application making the connection. If your reverse proxy uses a subpath, include the configured **URL Base**, such as `/prowlarr`, in the Prowlarr Server address.

Source: [Prowlarr host settings](https://wiki.servarr.com/prowlarr/settings#host).

</details>

Sources: [Prowlarr application setup](https://wiki.servarr.com/prowlarr/quick-start-guide#apps) · [Prowlarr server fields](https://wiki.servarr.com/prowlarr/settings#application-settings).

### 4. Sync and check your indexers

1. In **Prowlarr → Settings → Apps**, select **Sync App Indexers**.
2. Open **Settings → Indexers** in Sonarr or Radarr and confirm that the relevant indexers appeared.
3. Test those connections from the receiving application.
4. Run an interactive search in that application for something you know your indexer carries.

**Expected result:** The relevant indexers appear in Sonarr or Radarr, pass their tests, and return results in the interactive search.

If you already added indexers manually in Sonarr or Radarr, verify the new Prowlarr connections before disabling any duplicate manual entries.

<details>
<summary>Advanced: sync categories, profiles, and sync level</summary>

An indexer only syncs where its supported categories are relevant. For example, a TV-only indexer can be suitable for Sonarr without appearing in Radarr. Check the application's **Sync Categories** under **Show Advanced** if an expected indexer is missing.

In Prowlarr, review **Settings → Apps → Sync Profiles**. A profile controls whether its indexers support RSS, automatic searches, and interactive searches in the connected applications. Use the Standard profile initially and confirm the search types you want are enabled.

The application's **Sync Level** controls which settings Prowlarr manages. Keep **Full Sync** for central management, or choose **Add and Remove Only** if you want to manage the other indexer settings separately in each application.

Sources: [Sync settings](https://wiki.servarr.com/prowlarr/settings#sync-profiles) · [Indexer sync troubleshooting](https://wiki.servarr.com/prowlarr/faq#prowlarr-will-not-sync-x-indexer-to-app).

</details>

### 5. Check your download client

For downloads initiated by **Sonarr or Radarr**, configure and test the client in that application's **Settings → Download Clients**. Prowlarr does not sync download-client settings to those applications.

**Expected result:** The download client passes its test in each application that will send downloads to it.

<details>
<summary>Optional: send downloads directly from Prowlarr</summary>

Add a client inside **Prowlarr** only if you want to send downloads directly from Prowlarr's own search screen:

1. Open **Settings → Download Clients**, select **+**, and choose your client.
2. Enter its reachable host, web/API port, and requested credentials.
3. Set an appropriate category if you use one.
4. Select **Test**, then **Save**.

Use the client's **web interface/API port**, rather than its torrent peer-listening port.

Source: [Prowlarr download clients](https://wiki.servarr.com/prowlarr/settings#download-clients).

</details>

### 6. Make a backup

Open **System → Backup**, select **Backup Now**, and download the backup of Prowlarr's settings and database. Keep a copy outside the server hosting Prowlarr.

Review the schedule under **Settings → General → Backups**, enabling **Show Advanced** if needed. Include your appdata directory in your regular backups, and keep the Compose file too if you use Dockge.

Source: [Prowlarr backups](https://wiki.servarr.com/prowlarr/system#backup).

## Confirm everything works

Before calling the setup complete, check that:

- You can sign in to Prowlarr.
- Your configured indexers pass their tests.
- Each connected application passes its connection test.
- Expected indexers appear in Sonarr or Radarr and return search results.
- Each application that starts downloads has a working download client.
- Your first backup is stored somewhere you can recover it.

## Updates

Use the update mechanism belonging to your installation method. Review the [Prowlarr release notes](https://github.com/Prowlarr/Prowlarr/releases) and make a backup before updating.

| Platform | Where to update |
| --- | --- |
| TrueNAS | Use the app's update option in **TrueNAS Apps**. |
| Proxmox | Follow the current update instructions on the [Prowlarr script page](https://community-scripts.org/scripts/prowlarr). |
| Unraid | Use the container update controls on the **Docker** tab. |
| Docker | Open the stack in Dockge and use its update action to pull the image and recreate the container. |

For container installations, update the container image through its manager. See the [LinuxServer update guidance](https://docs.linuxserver.io/images/docker-prowlarr/#updating-info) for details.

After an update, open Prowlarr and repeat the indexer and application connection tests.

## Troubleshooting

If a test fails, use **System → Logs** to identify the failing connection. Expand the checks below for common problems.

<details>
<summary>Common problems and what to check</summary>

| Problem | What to check first |
| --- | --- |
| The web interface will not open | Confirm the app/container is running, then check its IP address, published port, and platform logs. For Proxmox, use the LXC address. |
| Prowlarr cannot connect to Sonarr or Radarr | Check the application URL and its API key. Verify routing and firewall access from Prowlarr's host or container. |
| Sonarr or Radarr cannot reach a synced indexer | Recheck the **Prowlarr Server** URL in that app's Prowlarr connection. It must work from the receiving application. |
| An indexer passes its test but does not sync | Check the app's sync level, tags, and supported categories. Inspect the sync error for an empty category test result. |
| An indexer reports unauthorized or rate-limited requests | Check its account credentials, subscription status, and provider limits. |
| The container reports permission errors | Check the configuration directory's ownership and access permissions against the user/group used by that installation. |
| Two Docker stacks cannot connect by service name | Confirm they share a user-defined Docker network, or use reachable host addresses and published ports. |
| Downloads work in Sonarr but not Prowlarr | Add and test a download client inside Prowlarr if you intend to download from its search screen. |

If an indexer specifically requires an additional proxy, consult [Prowlarr's indexer proxy documentation](https://wiki.servarr.com/prowlarr/settings#indexer-proxies). Add that extra service only when your provider needs it.

</details>

For more help, see the [Prowlarr troubleshooting guide](https://wiki.servarr.com/prowlarr/troubleshooting) and [FAQ](https://wiki.servarr.com/prowlarr/faq).

## Further reading

- [Prowlarr website](https://prowlarr.com/)
- [Official quick start guide](https://wiki.servarr.com/prowlarr/quick-start-guide)
- [Full settings reference](https://wiki.servarr.com/prowlarr/settings)
- [Supported applications and services](https://wiki.servarr.com/prowlarr/supported)
- [Prowlarr source code and releases](https://github.com/Prowlarr/Prowlarr)

*Tab icons: [Dashboard Icons](https://github.com/homarr-labs/dashboard-icons).*
